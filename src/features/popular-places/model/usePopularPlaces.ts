import { useState } from "react"
import { CityLocationType } from "@/features/popular-places/types"

export const usePopularPlaces = () => {
  const [selected, setSelected] = useState<CityLocationType>('Brazil')

  const handleSelect = (location: CityLocationType) => setSelected(location)

  return { selected, handleSelect }
}