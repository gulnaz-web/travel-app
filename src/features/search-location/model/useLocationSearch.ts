import { useState } from "react"

export const useLocationSearch = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  return { searchTerm, handleSearch }
}