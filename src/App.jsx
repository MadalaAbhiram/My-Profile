import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const profile = {
    name: 'Jane Doe',
    id: 'ID 1234567',
    photo: heroImg,
    tenth: { percentage: '95.4%', year: '2024' },
    inter: { percentage: '92.1%', year: '2026' },
  }

  return (
    <main className="profile-page">
      <section className="profile-card">
        <div className="profile-photo">
          <img src={profile.photo} alt={`${profile.name} photo`} />
        </div>
        <div className="profile-details">
          <div className="profile-header">
            <h1>{profile.name}</h1>
            <p className="profile-id">{profile.id}</p>
          </div>

          <div className="profile-academics">
            <h2>Academics</h2>
            <div className="profile-row">
              <span>10th Percentage</span>
              <strong>{profile.tenth.percentage}</strong>
            </div>
            <div className="profile-row">
              <span>Passed Year</span>
              <strong>{profile.tenth.year}</strong>
            </div>
            <div className="profile-row">
              <span>Inter Percentage</span>
              <strong>{profile.inter.percentage}</strong>
            </div>
            <div className="profile-row">
              <span>Passed Year</span>
              <strong>{profile.inter.year}</strong>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App