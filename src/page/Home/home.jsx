import axios from 'axios'
import { useEffect, useState } from "react";

import * as S from "./style";

export function Home() {
  const [ data, setData ] = useState([]);

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase()

    const filtro = data.filter(item => {
      const itemNameLower = item.name.toLowerCase()
      
      return itemNameLower.includes(search)
    })
      
    setData(filtro)
  }

  const handleFetch = async () => {
    const response = await axios.get('https://rickandmortyapi.com/api/character')

    const data = response.data.results

    setData(data)
  }

  useEffect(() => {
    handleFetch()
  }, [])

  return (
    <S.Container>

      <input type="text" placeholder="buscar personagens" onChange={(e) => handleSearch(e)} />


      <S.Content>
        {
          data.map((item, idx) => (
            <S.Card key={idx}>
              <figure>
                <img src={item.image} alt={item.image + item.name} />
              </figure>

              <span>{item.name}</span>
              <p>{item.location.name}</p>
            </S.Card>
          ))
        }
      </S.Content>
    </S.Container>
  )
}