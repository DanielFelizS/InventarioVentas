import { useState } from "./dependencies";


export default function useSearch() {
  const [search, setSearch] = useState('');

  const handleChangeSearch = (e)=>{
    setSearch(e.target.value);
  }

  return {
    search,
    handleChangeSearch
}
  
}
