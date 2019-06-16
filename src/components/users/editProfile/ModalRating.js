import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Media
} from 'reactstrap';
import StarRatingComponent from 'react-star-rating-component';

class ModalRating extends Component {
  state = {
    rating: 0
  };

  changeRating = newRating => {
    this.setState({
      rating: newRating
    });
  };

  submitRating = e => {
    this.props.submitRating(this.state.rating.toString());
    this.props.toggle(e, 'rating');
  };

  render() {
    const closeBtn = (
      <button className="close" onClick={e => this.props.toggle(e, 'rating')}>
        &times;
      </button>
    );

    return (
      <div>
        <Modal isOpen={this.props.open}>
          <ModalHeader close={closeBtn}>Deixe sua avaliação.</ModalHeader>
          <ModalBody className="d-flex flex-column align-items-center">
            <Media
              className="profile-image-rating"
              object
              src={this.props.profileImg}
            />
            <h5 style={{ marginTop: 20 }}>{this.props.userName}</h5>
            <StarRatingComponent
              name="star-rating"
              onStarClick={this.changeRating}
              value={this.state.rating}
              emptyStarColor="grey"
              starColor="#d46da9"
            />
          </ModalBody>
          <ModalFooter>
            <Button className="btn-custom-primary" onClick={this.submitRating}>
              Avaliar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalRating;
