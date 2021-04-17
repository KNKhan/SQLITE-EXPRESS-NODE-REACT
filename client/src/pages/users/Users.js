import React from 'react';
import PropTypes from 'prop-types';
import PageLayout from '../../layout/PageLayout';
import { getUsers } from '../../actions/userAction';
import { connect } from 'react-redux';
import './Users.css';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: this.props.getUsers(0, 20),
      totalPages: [],
      currentPage: 1,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps != this.props) {
      if (this.props.users.user.users != undefined) {
        this.pagination(2000);
      }
    }
  }

  pagination = (totalRecords) => {
    let totalPages = Math.ceil(totalRecords / 20);
    var arr = [];
    for (let i = 1; i < totalPages + 1; i++) {
      arr.push(i);
    }
    this.setState({ totalPages: arr });
  };

  prevPage = () => {
    if (this.state.currentPage > 1) {
      let currentPage = this.state.currentPage - 1;
      this.setState({ currentPage }, () => {
        console.log('this.state.currentPage', this.state.currentPage);
        this.props.getUsers(this.state.currentPage * 20 - 20, this.state.currentPage * 20);
      });
    }
  };

  nextPage = () => {
    if (this.state.currentPage < this.state.totalPages.length) {
      let currentPage = this.state.currentPage + 1;
      this.setState({ currentPage }, () => {
        console.log('this.state.currentPage', this.state.currentPage);
        this.props.getUsers(this.state.currentPage * 20 - 20, this.state.currentPage * 20);
      });
    }
  };

  navigatePage = (e) => {
    if (e.target.value >= 1 && e.target.value <= this.state.totalPages.length) {
      this.setState({ currentPage: e.target.value }, () => {
        console.log('this.state.currentPage', this.state.currentPage);
        this.props.getUsers(this.state.currentPage * 20 - 20, this.state.currentPage * 20);
      });
    }
  };

  render() {
    return (
      <div>
        <PageLayout title="SQLite User List" children="Test"></PageLayout>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>email</th>
              <th>dob</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.user.users != undefined
              ? this.props.users.user.users.data
                  .sort((a, b) => a.id - b.id)
                  .map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.firstname}</td>
                        <td>{user.lastname}</td>
                        <td>{user.email}</td>
                        <td>{user.dob}</td>
                      </tr>
                    );
                  })
              : ''}
          </tbody>
        </table>
        <div className="pagination">
          <button onClick={this.prevPage} disabled={this.state.currentPage == 1}>
            Prev
          </button>
          <span>
            Go to{' '}
            <input
              type="text"
              value={this.state.currentPage}
              onChange={this.navigatePage}
              min="1"
              max={this.state.totalPages.length}
            />
          </span>
          <button
            onClick={this.nextPage}
            disabled={this.state.currentPage == this.state.totalPages.length}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('mapStateToProps state', state);
  return {
    users: state,
  };
};
export default connect(mapStateToProps, { getUsers })(Users);
