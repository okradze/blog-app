import React from 'react';
import { connect } from 'react-redux';
import { setTitleFilter } from '../actions/filters';

export class BlogFilters extends React.Component {
    onTitleChange = (e) => {
        this.props.setTitleFilter(e.target.value);
    };
    render() {
        return (
            <div>
                <input type="text" placeholder="Search by title" onChange={this.onTitleChange} />
            </div>
        );
    };
};

const mapDispatchToProps = (dispatch) => ({
    setTitleFilter: (title) => dispatch(setTitleFilter(title))
});

export default connect(undefined, mapDispatchToProps)(BlogFilters);