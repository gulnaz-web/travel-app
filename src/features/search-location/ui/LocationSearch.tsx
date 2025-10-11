'use client'

import { useState } from 'react'
import styles from './LocationSearch.module.scss'

export const LocationSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')


  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

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