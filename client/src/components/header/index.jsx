import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hook/useDebounce";

import "./index.css";

const Header = () => {
  const navigate = useNavigate();
  // State and state setter for the search query
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);
  const [type, setType] = useState("name");
  // handleChangeSearch to change  search
  const changeHandler = (event) => {
    setSearch(event.target.value);
  };
  //  Hook will return only the last value (which we passed) ...
  // if more than 500ms has passed since last call.
  // Otherwise, it will return the previous value of search.
  //  The goal is to call filter only after the user has stopped
  //  typing so we don't end up calling the filter too often.
  const debounceChange = useDebounce(changeHandler, 500);
  // useeffect will be triggered when the filter is changed
  useEffect(() => {
    navigate({
      pathname: "/",
      search: `?filterBy=${type}&sort=${sort}&search=${search}`,
    });
  }, [navigate, search, type, sort]);

  return (
    <div className="header">
      <div>
        <img
          className="header__logo"
          src="https://cdn-icons-png.flaticon.com/512/1994/1994825.png"
          alt=""
        />
      </div>
      <div className="header__items">
        <div className="header_select">
          <label className="header__select-label">фильтр по:</label>
          <select
            className="header__search"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="name">Названию</option>
            <option value="quantity">Количеству</option>
            <option value="distance">Расстоянию</option>
          </select>
        </div>
        <div className="header__checkbox">
          <label>
            <input type="checkbox" onChange={(e) => setSort(!sort)} />
            <div className="icon-box">
              <img
                src="https://www.pngrepo.com/png/310152/512/text-sort-ascending.png"
                alt="sort"
              />
            </div>
          </label>
        </div>

        <input
          className="header__search"
          type="search"
          placeholder="Поиск по значению"
          onChange={debounceChange}
        />
      </div>
    </div>
  );
};

export default Header;
