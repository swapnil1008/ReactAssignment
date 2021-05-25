import React, { Component } from "react";
import DiscoverBlock from "./DiscoverBlock/components/DiscoverBlock";
import "../styles/_discover.scss";
import Config from "../../../config";
import axios from "axios";

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
    };
  }
  componentDidMount() {
    axios(`${Config.api.authUrl}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " + btoa(Config.api.clientId + ":" + Config.api.clientSecret),
      },
      data: "grant_type=client_credentials",
      method: "POST",
    }).then((tokenResponse) => {
      axios(`${Config.api.baseUrl}/browse/new-releases`, {
        method: "GET",
        headers: { Authorization: "Bearer " + tokenResponse.data.access_token },
      }).then((genreResponse) => {
        this.setState({ newReleases: genreResponse.data.albums.items });
      });
      axios(`${Config.api.baseUrl}/browse/featured-playlists`, {
        method: "GET",
        headers: { Authorization: "Bearer " + tokenResponse.data.access_token },
      }).then((genreResponse) => {
        this.setState({ playlists: genreResponse.data.playlists.items });
      });
      axios(`${Config.api.baseUrl}/browse/categories`, {
        method: "GET",
        headers: { Authorization: "Bearer " + tokenResponse.data.access_token },
      }).then((genreResponse) => {
        this.setState({ categories: genreResponse.data.categories.items });
      });
    });
  }

  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock
          text="RELEASED THIS WEEK"
          id="released"
          data={newReleases}
        />
        <DiscoverBlock
          text="FEATURED PLAYLISTS"
          id="featured"
          data={playlists}
        />
        <DiscoverBlock
          text="BROWSE"
          id="browse"
          data={categories}
          imagesKey="icons"
        />
      </div>
    );
  }
}
