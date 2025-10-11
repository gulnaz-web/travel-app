import { LocationSearch } from '@/features/search-location'
import { PopularPlaces } from '@/features/popular-places'
import styles from './SearchPanel.module.scss'

export const SearchPanel = () => {

  return (
    <section className={styles.section}>
      <LocationSearch />
      <PopularPlaces />
    </section >
  )
}
