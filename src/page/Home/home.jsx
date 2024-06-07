import axios from "axios";
import { useEffect, useState } from "react";

import * as S from "./style";

export function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    if (search === "") {
      setFilteredData(data);
    } else {
      const filtro = data.filter((item) => {
        const itemNameLower = item.name.toLowerCase();
        return itemNameLower.includes(search);
      });
      setFilteredData(filtro);
    }
  };

  const handleFetch = async () => {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/character"
    );

    const fetchedData = response.data.results;

    setData(fetchedData);
    setFilteredData(fetchedData);
  };

  useEffect(() => {
    handleFetch();
  }, []);

  return (
    <S.Container>
      <input
        type="text"
        placeholder="buscar personagens"
        onChange={handleSearch}
      />

      <S.Content>
        {filteredData.map((item, idx) => (
          <S.Card key={idx}>
            <figure>
              <img src={item.image} alt={item.image + item.name} />
            </figure>

            <span>{item.name}</span>
            <p>{item.location.name}</p>
          </S.Card>
        ))}
      </S.Content>
    </S.Container>
  );
}
