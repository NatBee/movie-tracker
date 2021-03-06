import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFavorites } from '../../helper/apiCall';
import Movie from '../Movie/Movie';
import PropTypes from 'prop-types';

export class FavoritesDisplay extends Component {
  constructor() {
    super();

    this.state = {
      favorites: [],
      favoritesAlert: null,
    }
  }

  componentDidMount() {
    this.loadFavorites();
  }

  componentDidUpdate() {
    this.loadFavorites();
  }

  loadFavorites = async () => {
    const userId = this.props.userId;
    const results = await getFavorites(userId);
    const favorites = await results.data;
    this.setState({ favorites })
  }

  noFavorites = () => {
    if(this.state.favorites.length === 0) {
      this.setState({favoritesAlert: 'You have no movies in your favorites.'})
    }
  }

  renderFavorites = () => {
    return this.state.favorites.map( movie => {
      return (
        <Movie key={ movie.id }
               poster={ movie.poster_path }
               title={ movie.title }
               rating={ movie.popularity }
               overview={ movie.overview }
               releaseDate={ movie.release_date }
               id={ movie.id } />
      ) 
    })
  }

  render() {
    return (
      <div className="container">
        { 
          this.props.userId &&
          this.renderFavorites() 
        }
        <h2 className="favorites-alert">{this.state.favoritesAlert}</h2>
      </div>
    );
  }
}

export const mapStateToProps = (store) => ({
  userId: store.current_user.id
})

FavoritesDisplay.propTypes = {
  userId: PropTypes.number,
  favorites: PropTypes.array,
  loadFavorites: PropTypes.func,
  noFavorites: PropTypes.func,
}
export default connect(mapStateToProps, null)(FavoritesDisplay);