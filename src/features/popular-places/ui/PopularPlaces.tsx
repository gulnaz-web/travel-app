
'use client'

import { useState } from 'react'
import styles from './PopularPlaces.module.scss'

const cities = [
  {
    location: 'Paris',
  },
  {
    location: 'Bora Bora',
  },
  {
    location: 'Maui',
  },
  {
    location: 'Tahiti',
  },
  {
    location: 'Brazil',
  },
  {
    location: 'Norway',
  },
] as const

type CityLocation = typeof cities[number]['location']

const getButtonClassName = (isActive: boolean): string =>
  isActive ? `${styles.button} ${styles.active}` : styles.button


export const PopularPlaces = () => {
  const [selected, setSelected] = useState<CityLocation>('Brazil')

  return (
    <div className={styles.wrapper}>
      {cities.map((city) => {
        const isActive = city.location === selected

        return (
          <button
            key={city.location}
            className={getButtonClassName(isActive)}
            onClick={() => setSelected(city.location)}
          >
            {city.location}
          </button>
        )
      })}
    </div>
  )
}