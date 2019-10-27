import React, { Component } from "react";

class Carousel extends Component {
  // doing this the old way for practice's sake.
  constructor(props) {
    super(props);

    this.state = {
      photos: [],
      active: 0
    };
    // this is to bind this to the component within the function, so we can use 'this' properly. 
    // this.handleIndexClick = this.handleIndexClick.bind(this);
  }

  // handleIndexClick() {
  //   this.setState({
  //     active: +event.target.dataset.index
  //   })
  // }

  // or: 

  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index
    });
  }

  static getDerivedStateFromProps({ media }) {
    // default image.
    let photos ['http://placecorgi.com/600/600'];
    if (media.length) {
      photos = media.map(({large}) => large);
    }

    return { photos }
  }
  render() {
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
            <img
              key={photo}
              onClick={this.handleIndexClick}
              onKeyUp={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}
export default Carousel;
