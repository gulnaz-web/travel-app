
'use client'

import { usePopularPlaces } from '../model/usePopularPlaces'
import { cities } from '@/features/popular-places/constants'
import styles from './PopularPlaces.module.scss'

const getButtonClassName = (isActive: boolean): string =>
  isActive ? `${styles.button} ${styles.active}` : styles.button

export const PopularPlaces = () => {
  const { selected, handleSelect } = usePopularPlaces()

  return (
    <div className={styles.wrapper}>
      {cities.map((city) => {
        const isActive = city.location === selected

        return (
          <button
            key={city.location}
            className={getButtonClassName(isActive)}
            onClick={() => handleSelect(city.location)}
          >
            {city.location}
          </button>
        )
      })}
    </div>
  )
}