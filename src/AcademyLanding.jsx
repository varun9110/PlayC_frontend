import React, { useState } from 'react';
import axios from 'axios';

const sportsList = ['Badminton', 'Tennis', 'Table Tennis', 'Squash', 'Basketball', 'Cricket'];

export default function AcademyLanding() {
  const email = JSON.parse(localStorage.getItem('user'))?.email;
  const [selectedSports, setSelectedSports] = useState([]);
  const [sportsConfig, setSportsConfig] = useState({});

  const generateTimeSlots = (start, end) => {
    const slots = [];
    let [h] = start.split(':').map(Number);
    const [endH] = end.split(':').map(Number);
    while (h < endH) {
      slots.push(`${String(h).padStart(2, '0')}:00`);
      h++;
    }
    return slots;
  };

  const handleAddSport = (sport) => {
    if (!selectedSports.includes(sport)) {
      setSelectedSports([...selectedSports, sport]);
      setSportsConfig({
        ...sportsConfig,
        [sport]: {
          numberOfCourts: 1,
          startTime: '08:00',
          endTime: '20:00',
          pricing: []
        }
      });
    }
  };

  const handleGeneratePricing = (sport) => {
    const config = sportsConfig[sport];
    const timeSlots = generateTimeSlots(config.startTime, config.endTime);
    const pricing = Array.from({ length: config.numberOfCourts }, (_, i) => ({
      courtNumber: i + 1,
      prices: timeSlots.map(time => ({ time, price: 0 }))
    }));
    setSportsConfig({
      ...sportsConfig,
      [sport]: { ...config, pricing }
    });
  };

  const handlePriceChange = (sport, courtIdx, timeIdx, value) => {
    const updated = { ...sportsConfig };
    updated[sport].pricing[courtIdx].prices[timeIdx].price = Number(value);
    setSportsConfig(updated);
  };

  const handleSubmit = async () => {
    const sports = selectedSports.map(sport => ({
      sportName: sport,
      numberOfCourts: sportsConfig[sport].numberOfCourts,
      startTime: sportsConfig[sport].startTime,
      endTime: sportsConfig[sport].endTime,
      pricing: sportsConfig[sport].pricing
    }));

    await axios.post('http://localhost:5000/api/academy/configure', {
      email,
      sports
    });
    alert('Academy configuration saved.');
  };

  return (
    <div className="academy-form">
      <h2>Academy Setup</h2>

      <h3>Select Sports:</h3>
      {sportsList.map(s => (
        <button type="button" key={s} onClick={() => handleAddSport(s)} disabled={selectedSports.includes(s)}>
          {s}
        </button>
      ))}

      {selectedSports.map(sport => {
        const config = sportsConfig[sport];
        const timeSlots = generateTimeSlots(config.startTime, config.endTime);

        return (
          <div key={sport} className="sport-config">
            <h4>{sport}</h4>
            <label>Number of Courts:</label>
            <input
              type="number"
              value={config.numberOfCourts}
              onChange={e => setSportsConfig({
                ...sportsConfig,
                [sport]: { ...config, numberOfCourts: +e.target.value }
              })}
            />
            <label>Start Time:</label>
            <input
              type="time"
              value={config.startTime}
              onChange={e => setSportsConfig({
                ...sportsConfig,
                [sport]: { ...config, startTime: e.target.value }
              })}
            />
            <label>End Time:</label>
            <input
              type="time"
              value={config.endTime}
              onChange={e => setSportsConfig({
                ...sportsConfig,
                [sport]: { ...config, endTime: e.target.value }
              })}
            />
            <button type="button" onClick={() => handleGeneratePricing(sport)}>Generate Pricing Table</button>

            {config.pricing.length > 0 && (
              <table className="pricing-table">
                <thead>
                  <tr>
                    <th>Court</th>
                    {timeSlots.map(time => <th key={time}>{time}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {config.pricing.map((court, courtIdx) => (
                    <tr key={court.courtNumber}>
                      <td>Court {court.courtNumber}</td>
                      {court.prices.map((slot, timeIdx) => (
                        <td key={timeIdx}>
                          <input
                            type="number"
                            value={slot.price}
                            onChange={e => handlePriceChange(sport, courtIdx, timeIdx, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        );
      })}

      <button onClick={handleSubmit}>Submit Academy Details</button>
    </div>
  );
}