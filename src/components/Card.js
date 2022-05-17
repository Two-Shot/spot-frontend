import "./Card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, brands } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import { useState } from "react";

const Card = (props) => {
  const saveToggleClick = async () => {
    props.setDisableSave(true);
    const res = props.saved
      ? await props.removeSavedItem(props.item.spotInfo.id, props.index)
      : await props.addSavedItem(props.item.spotInfo.id, props.index);
    if (res) {
      props.setDisableSave(false);
    } else {
      // ADD ERROR HANDLING ALERT
      props.setDisableSave(true);
    }
  };

  return (
    <div
      className="card"
      style={
        props.item.spotInfo.album.url.substring(
          props.item.spotInfo.album.url.length - 22,
          props.item.spotInfo.album.url.length
        ) == props.item.spotInfo.id
          ? { border: "2px solid red" }
          : null
      }
    >
      <a href={props.item.spotInfo.url} rel="nor\eferrer" target="_blank">
        <img
          src={props.item.spotInfo.image}
          style={{ cursor: "pointer" }}
          className="card-img"
        />
      </a>
      <div className="info">
        <p className="score">
          <FontAwesomeIcon icon={solid("arrow-up")} />
          {" " + props.item.redditInfo.score}
        </p>

        <a
          className="item"
          href={props.item.spotInfo.url}
          rel="noreferrer"
          target="_blank"
          style={{ cursor: "pointer" }}
        >
          {props.item.spotInfo.name}
        </a>
        <a
          className="artist"
          href={props.item.spotInfo.artist.url}
          rel="noreferrer"
          target="_blank"
          style={{ cursor: "pointer" }}
        >
          {props.item.spotInfo.artist.name}
        </a>
      </div>

      <div className="text-links">
        <div>
          <a href={props.item.spotInfo.url} style={{ color: "rgb(30 215 96)" }}>
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={brands("spotify")}
            />
          </a>
        </div>
        <div
          style={{
            color: props.disableSave
              ? "gray"
              : props.saved
              ? " rgb(255, 88, 88)"
              : "rgb(125, 70, 70)",
          }}
        >
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            icon={
              props.saved
                ? solid("heart-circle-minus")
                : solid("heart-circle-plus")
            }
            onClick={props.disableSave ? null : saveToggleClick}
          />
        </div>{" "}
        <div>
          <a
            style={{ color: "rgb(212, 212, 212)" }}
            href={props.item.redditInfo.url}
          >
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={brands("reddit-alien")}
            />
          </a>
        </div>
        <div style={{ color: "aliceblue" }}>
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            icon={solid("share-nodes")}
            onClick={() => props.openModal(props.item.spotInfo)}
          />
        </div>
      </div>
      <p style={{ fontSize: 10 }}>
        album:
        {props.item.spotInfo.album.url.substring(
          props.item.spotInfo.album.url.length - 22,
          props.item.spotInfo.album.url.length
        )}
      </p>
      <p style={{ fontSize: 10 }}>track: {props.item.spotInfo.id}</p>
    </div>
  );
};

export default Card;
