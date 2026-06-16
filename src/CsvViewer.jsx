import { useState, useCallback, useRef } from 'react'
import './CsvViewer.css'

/**
 * Parse a CSV string into a 2D array, handling quoted fields.
 */
function parseCsv(text) {
  const rows = []
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n')

  for (const line of lines) {
    if (line.trim() === '') continue
    const cols = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const ch = line[i]
      if (ch === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (ch === ',' && !inQuotes) {
        cols.push(current)
        current = ''
      } else {
        current += ch
      }
    }
    cols.push(current)
    rows.push(cols)
  }

  return rows
}

/**
 * Convert a 2D array back to a CSV string.
 */
function toCsv(headers, rows) {
  const escape = (val) => {
    const s = String(val)
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? `"${s.replace(/"/g, '""')}"`
      : s
  }
  const lines = [headers, ...rows].map((row) => row.map(escape).join(','))
  return lines.join('\r\n')
}

const SAMPLE_CSV = `Name,Age,City,Occupation
Alice Johnson,29,New York,Engineer
Bob Smith,34,Los Angeles,Designer
Carol White,27,Chicago,Developer
David Brown,42,Houston,Manager
Eva Martinez,31,Phoenix,Analyst`

export default function CsvViewer() {
  const [headers, setHeaders] = useState([])
  const [rows, setRows] = useState([])
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')
  const [editCell, setEditCell] = useState(null) // { row, col }
  const [editValue, setEditValue] = useState('')
  const [sortConfig, setSortConfig] = useState({ col: null, dir: 'asc' })
  const [search, setSearch] = useState('')
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)

  const loadCsv = useCallback((text, name = '') => {
    try {
      const parsed = parseCsv(text)
      if (parsed.length === 0) {
        setError('The file appears to be empty.')
        return
      }
      setHeaders(parsed[0])
      setRows(parsed.slice(1))
      setFileName(name)
      setError('')
      setSortConfig({ col: null, dir: 'asc' })
      setSearch('')
    } catch {
      setError('Failed to parse the CSV file.')
    }
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => loadCsv(ev.target.result, file.name)
    reader.readAsText(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (!file) return
    if (!file.name.endsWith('.csv')) {
      setError('Please drop a .csv file.')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => loadCsv(ev.target.result, file.name)
    reader.readAsText(file)
  }

  const handleLoadSample = () => loadCsv(SAMPLE_CSV, 'sample.csv')

  const handleSort = (colIndex) => {
    setSortConfig((prev) => ({
      col: colIndex,
      dir: prev.col === colIndex && prev.dir === 'asc' ? 'desc' : 'asc',
    }))
  }

  const handleCellDoubleClick = (rowIndex, colIndex, value) => {
    setEditCell({ row: rowIndex, col: colIndex })
    setEditValue(value)
  }

  const commitEdit = () => {
    if (!editCell) return
    setRows((prev) =>
      prev.map((row, r) =>
        r === editCell.row
          ? row.map((cell, c) => (c === editCell.col ? editValue : cell))
          : row
      )
    )
    setEditCell(null)
  }

  const addRow = () => {
    setRows((prev) => [...prev, Array(headers.length).fill('')])
  }

  const deleteRow = (index) => {
    setRows((prev) => prev.filter((_, i) => i !== index))
  }

  const handleDownload = () => {
    const csv = toCsv(headers, rows)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName || 'export.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  // Apply search filter then sort
  const filteredRows = rows.filter((row) =>
    row.some((cell) => cell.toLowerCase().includes(search.toLowerCase()))
  )

  const sortedRows =
    sortConfig.col !== null
      ? [...filteredRows].sort((a, b) => {
          const va = a[sortConfig.col] ?? ''
          const vb = b[sortConfig.col] ?? ''
          const numA = parseFloat(va)
          const numB = parseFloat(vb)
          const cmp =
            !isNaN(numA) && !isNaN(numB)
              ? numA - numB
              : va.localeCompare(vb)
          return sortConfig.dir === 'asc' ? cmp : -cmp
        })
      : filteredRows

  const hasData = headers.length > 0

  return (
    <div className="csv-page">
      <header className="csv-header">
        <h1>CSV Viewer</h1>
        {fileName && <span className="csv-filename">{fileName}</span>}
      </header>

      {/* Drop zone / upload area */}
      <div
        className={`csv-dropzone ${dragging ? 'dragging' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        aria-label="Upload CSV file"
        onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
      >
        <svg className="csv-upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
        <p>Drag &amp; drop a CSV file here, or <strong>click to browse</strong></p>
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          onChange={handleFileChange}
          className="csv-file-input"
          aria-label="Select CSV file"
        />
      </div>

      <div className="csv-actions-bar">
        <button className="csv-btn secondary" onClick={handleLoadSample}>
          Load Sample
        </button>
        {hasData && (
          <>
            <input
              type="search"
              className="csv-search"
              placeholder="Search…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search table"
            />
            <span className="csv-row-count">
              {sortedRows.length} / {rows.length} rows
            </span>
            <button className="csv-btn primary" onClick={handleDownload}>
              ↓ Download CSV
            </button>
          </>
        )}
      </div>

      {error && <p className="csv-error" role="alert">{error}</p>}

      {hasData && (
        <div className="csv-table-wrapper">
          <table className="csv-table">
            <thead>
              <tr>
                <th className="csv-th csv-col-index" aria-label="Row number">#</th>
                {headers.map((h, i) => (
                  <th
                    key={i}
                    className="csv-th sortable"
                    onClick={() => handleSort(i)}
                    aria-sort={
                      sortConfig.col === i
                        ? sortConfig.dir === 'asc' ? 'ascending' : 'descending'
                        : 'none'
                    }
                  >
                    {h}
                    <span className="sort-indicator" aria-hidden="true">
                      {sortConfig.col === i
                        ? sortConfig.dir === 'asc' ? ' ▲' : ' ▼'
                        : ' ⇅'}
                    </span>
                  </th>
                ))}
                <th className="csv-th csv-col-action">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((row, rIdx) => (
                <tr key={rIdx} className="csv-row">
                  <td className="csv-td csv-col-index">{rIdx + 1}</td>
                  {headers.map((_, cIdx) => (
                    <td
                      key={cIdx}
                      className="csv-td"
                      onDoubleClick={() => handleCellDoubleClick(rIdx, cIdx, row[cIdx] ?? '')}
                    >
                      {editCell?.row === rIdx && editCell?.col === cIdx ? (
                        <input
                          className="csv-cell-input"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={commitEdit}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') commitEdit()
                            if (e.key === 'Escape') setEditCell(null)
                          }}
                          autoFocus
                          aria-label={`Edit ${headers[cIdx]} row ${rIdx + 1}`}
                        />
                      ) : (
                        <span title="Double-click to edit">{row[cIdx]}</span>
                      )}
                    </td>
                  ))}
                  <td className="csv-td csv-col-action">
                    <button
                      className="csv-btn-icon delete"
                      onClick={() => deleteRow(rIdx)}
                      aria-label={`Delete row ${rIdx + 1}`}
                      title="Delete row"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {hasData && (
        <div className="csv-footer">
          <button className="csv-btn secondary" onClick={addRow}>
            + Add Row
          </button>
        </div>
      )}

      {!hasData && !error && (
        <p className="csv-hint">No data loaded. Upload a file or load the sample.</p>
      )}
    </div>
  )
}
