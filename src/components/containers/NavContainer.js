import React, { Component } from "react";

class NavContainer extends Component {
  state = {};
  render() {
    return (
      <div>
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item">About Me</a>

              <a class="navbar-item">Photos</a>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <a class="button is-primary">
                    <strong>Blogs</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default NavContainer;
