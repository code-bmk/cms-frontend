import React, { Component } from "react";

class DashboardNavContainer extends Component {
  state = {};
  render() {
    return (
      <div> 
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div id="dashboardNavbar" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item">Dashboard</a>

              <a class="navbar-item">Statistics</a>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <a class="button is-primary" href="/edit">
                    <strong>Create BlogPost</strong>
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

export default DashboardNavContainer;
