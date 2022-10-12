import { useEffect, useMemo, useState } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/header";
import Content from "./components/content";
import usePagination from "./hook/usePagination";
import PaginationNav from "./components/pagination";
import { useSearchParams } from "react-router-dom";
function App() {
  // hook to get query parameters
  const [searchParams] = useSearchParams();
   // State and state setter for getting data
  const [data, setData] = useState({ data: [], total: 0 });
  const [loading, setLoading] = useState(false);
  // auxiliary parameters for pаgination
  const {
    pagination,
    prevPage,
    nextPage,
    changePage,
    currentPage,
  } = usePagination({
    itemsPerPage: 5,
    data: data.data,
    startFrom: 1,
    total: data.total,
  });

  // This is where the API is called
  // We useEffect because it is an asynchronous action
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://crazybox-m7ekt9ot3-kerim-frontend.vercel.app/api/table?page=${currentPage}&limit=5`)
      .then(({ data }) => {
        setData({ data: data.data, total: data.total });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [currentPage]);


    // sort by filterBy
    const sortData = 
       searchParams.get('sort') === 'true'
      ? [...data.data].sort(function (a, b) {
          if (a[searchParams.get('filterBy')] > b[searchParams.get('filterBy')]) {
            return 1;
          }
          if (a[searchParams.get('filterBy')] < b[searchParams.get('filterBy')]) {
            return -1;
          }
          return 0;
        })
      : data.data


    const results = useMemo(() => {
     return  !searchParams.get('search')
      ? sortData
      : data.data.filter((item) =>
      String(item[searchParams.get('filterBy')]).toLocaleLowerCase()
            .startsWith(searchParams.get('search').toLocaleLowerCase().trim())
        );
    }, [data.data, searchParams, sortData])
    

  return (
    <div className="App">
      <Header />
      <Content results={results} loading={loading} />
      <PaginationNav
        prevPage={prevPage}
        nextPage={nextPage}
        changePage={changePage}
        pagination={pagination}
      />
    </div>
  );
}

export default App;
