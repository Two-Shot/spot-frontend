import "./SearchOptions.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

const SearchOptions = (props) => {
  const [disable, setDisable] = useState(false);
  const onChange = (e) => {
    if (e.target.value !== "top") {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  const nextPage = () => {
    props.setPage({ index: props.page.index + 1, move: "after" });
  };

  const prevPage = () => {
    props.setPage({ index: props.page.index - 1, move: "before" });
  };

  const submitSearch = (e) => {
    e.preventDefault();
    props.setMusicItems([]);
    props.setSearchOps({
      q: e.target[0].value,
      sort: e.target[1].value,
      t: e.target[2].value,
    });
    props.setPage({ index: 0, move: "" });
  };

  return (
    <form className="form-container" onSubmit={submitSearch}>
      <select disabled={props.loading} name="q" className="typeSelect">
        <option name="album" value="album">
          Albums
        </option>
        <option name="track" value="track">
          Tracks
        </option>
      </select>

      <select
        disabled={props.loading}
        onChange={onChange}
        className="sortSelect"
        name="sort"
      >
        <option name="top" value="top">
          Top
        </option>
        <option name="hot" value="hot">
          Hot
        </option>
        <option name="new" value="new">
          New
        </option>
      </select>
      {disable ? (
        <select disabled={true} className={"disabled"} name="t">
          <option name="year" value="year">
            N/A
          </option>{" "}
        </select>
      ) : (
        <select
          disabled={disable || props.loading}
          className={disable ? "disabled " : "" + "timeSelect"}
          name="t"
          defaultValue="week"
        >
          <option name="year" value="year">
            Year
          </option>
          <option name="month" value="month">
            Month
          </option>
          <option name="week" value="week">
            Week
          </option>
          <option name="day" value="day">
            Day
          </option>
          <option name="all" value="all">
            All
          </option>
        </select>
      )}

      {props.loading ? (
        <button disabled={props.loading}>Please wait</button>
      ) : (
        <div className="nav-buttons">
          <FontAwesomeIcon
            icon={solid("caret-left")}
            className="page-button"
            style={!props.before ? { color: "rgb(75,75,75)" } : null}
            onClick={props.before ? prevPage : null}
          />
          <button className="clickable">Search</button>
          <FontAwesomeIcon
            icon={solid("caret-right")}
            className="page-button"
            style={!props.after ? { color: "rgb(75,75,75)" } : null}
            onClick={props.after ? nextPage : null}
          />
        </div>
      )}
    </form>
  );
};

export default SearchOptions;
