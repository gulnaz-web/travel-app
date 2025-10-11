'use client'
import { useLocationSearch } from '@/features/search-location/model/useLocationSearch'
import styles from './LocationSearch.module.scss'

export const LocationSearch = () => {
  const { searchTerm, handleSearch } = useLocationSearch()

  return (
    <div className={styles.search}>
      <span className="material-icons-outlined">
        search
      </span>
      <input type="text" placeholder="Search place..." value={searchTerm} onChange={handleSearch} />
      <span className={`material-icons-outlined ${styles.search__filter_icon}`}>
        tune
      </span>
    </div>
  )
}