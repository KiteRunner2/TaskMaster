import React, { useState, useEffect } from "react";
import "../../components-style.css";
import PropTypes from "prop-types";
import Card from "../Card/Card";
import Draggable from "../Draggable/Draggable";
import styled from "styled-components";
import ColumnTitle from "../ColumTitle/ColumnTitle";
import { v4 as uuidv4 } from "uuid";
import { useGlobalUserStore } from "../GlobalUserStore/GlobalUserStore";
import { connect } from "react-redux";
import * as actionType from "../../store/types";


function Column(props) {

    const {dispatch} = props;
  
  const [cards, setCard] = useState(props.cards ? props.cards : []);
 
  const [show, setShow] = useState(false);

  function showModal() {
    console.log("showModal function called...");
    setShow(true);
  }

  function hideModal() {
    console.log("hideModal function called...");
    setShow(false);
  }

  function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("transfer");
    // console.log('id of transferred element', data);
    // console.log(document.getElementById('abc'));
    let toDrop = document.getElementById(data);
    e.target.appendChild(toDrop);
    // console.log('dropped element', document.getElementById(data));
    let droppedCard = document.getElementById(data);
    let cardTitle = document.getElementById("title" + data);
    let cardDescription = document.getElementById("desc" + data);
    let cardDate = document.getElementById("date" + data);
    // console.log('DROPPED CARD:', droppedCard);
    // console.log(
    //     'dropped card dataset',
    //     'colIndex: ',
    //     droppedCard.dataset.colindex,
    //     'cardIndex: ',
    //     droppedCard.dataset.cardindex
    // );
    // console.log(
    //     `dropped card content on column ${props.colIndex}`,
    //     'TITLE',
    //     droppedCard.children[1].children[1].children[0].children[0]
    //         .children[0].children[0].value
    // );
    // console.log(
    //     'dropped card content DESCRIPTION',
    //     droppedCard.children[3].children[0].children[0].children[0].value
    // );
    // console.log(
    //     'dropped card content DUE DATE',
    //     droppedCard.children[5].value
    // );
    // console.log('dropped card children', droppedCard.children[1].children);
    // document.removeChild(document.getElementById(data));
    let element = document.getElementById(data);
    element.parentNode.removeChild(element);
    // console.log('something dropped on me!');
    // addCard();
    let dataToPass = {
      toAdd: {
        colIndex: props.colIndex,
        title: cardTitle.value,
        description: cardDescription.value,
        duedate: cardDate.value,
      },
      toRemove: {
        colIndex: droppedCard.dataset.colindex,
        cardIndex: droppedCard.dataset.cardindex,
      },
    };
    props.updateCardsOnDrop(dataToPass);
    // let col = document.getElementById('qaz');
    // console.log(col.childNodes);
    // console.log(col.childNodes[2].childNodes.length);

    // addCard();
  }

  function allowDrop(e) {
    e.preventDefault();
  }

  // function addCard() {
  //     cards.push({ title: 'new card', duedate: Date.now() });
  //     setCard([...cards]);
  // }

  // function deleteCard(e) {
  //     console.log('delete card clicked', e.target);
  // }
  function dragEnd() {
    // console.log('drag ended');
  }
  return (
    <div
      className="project-column"
      id={props.id}
      onDrop={drop}
      onDragOver={allowDrop}
      // style={props.style}
      onDragEnd={dragEnd}
      key={uuidv4()}
    >
      <div className="column-header">
        <button
          type="button"
          className="btn-sm btn-dark colDel"
          onClick={() => dispatch({type:actionType.DELETE_COLUMN,payload:{colIndex:props.colIndex}})}
        >
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
      {props.colTitle}
      <button
        type="button"
        className="btn-sm btn-dark"
        onClick={() => props.addCard(props.colIndex)}
      >
        Add Card
      </button>
      {cards.map((element, index) => {
        return (
          <Draggable
            id={element.id}
            style={{ margin: "8px" }}
            cardIndex={index}
            colIndex={props.colIndex}
            deleteCard={props.deleteCard}
            saveCard={props.saveCard}
            key={uuidv4()}
            show={show}
            handleModalClose={hideModal}
            handleModalOpen={showModal}
          >
            <Card
              card={element}
              columnid={props.colid}
              key={uuidv4()}
              shared={props.shared}
              deleteCard={props.deleteCard}
              cardIndex={index}
              colIndex={props.colIndex}
              assignToCard={props.assignToCard}
            />
          </Draggable>
        );
      })}
      {props.children}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userprofile: { ...state.user },
    currentDashboard: state.currentDashboard,
  };
};

// Column.propTypes = {
//   id: PropTypes.string,
//   style: PropTypes.object,
//   children: PropTypes.node,
// };

export default connect(mapStateToProps)(Column);
