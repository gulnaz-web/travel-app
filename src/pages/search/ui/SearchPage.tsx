import { SearchPanel } from '@/widgets/search-panel'
import styles from './SearchPage.module.scss'

export const SearchPage = () => {
  return (
    <div className={styles.container}>
      <SearchPanel />
    </div>
  )
}
