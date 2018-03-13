import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import 'react-tabs/style/react-tabs.scss';
import LocationsTable from '../container/locations-table';
import {
  FETCH_CHIEFDOMS, FETCH_DISTRICTS, FETCH_FACILITIES,
  FETCH_COMMUNITIES,
} from '../actions/types';
import {
  hasAuthority,
  MANAGE_FACILITIES_AUTHORITY,
} from '../utils/authorization';

const FacilityTypeFilter = ({ onChange }) => (
  <select
    onChange={event => onChange(event.target.value)}
    style={{ width: '100%' }}
  >
    <option value="">Show All</option>
    <option value="CHC">CHC</option>
    <option value={hasAuthority(MANAGE_FACILITIES_AUTHORITY)}>CHP</option>
    <option value="MCHP">MCHP</option>
    <option value="clinic">Clinic</option>
    <option value="hospital">Hospital</option>
  </select>);

class Locations extends Component {
  constructor(props){
      super(props);
      this.handleTabSelect = this.handleTabSelect.bind(this);
  }

  static getCommunityColumns = () => [
    {
      Header: 'Actions',
      minWidth: 50,
      accessor: 'id',
      Cell: cell => (
        <div className="actions-buttons-container">
          <Link
            to={`/locations/community/${cell.value}`}
            type="button"
            className="btn btn-primary margin-right-sm"
            title="Edit"
          >
            <span className="glyphicon glyphicon-edit" />
            <span className="hide-min-r-small-min next-button-text">Edit</span>
          </Link>
        </div>
      ),
      filterable: false,
      sortable: false,
      show: hasAuthority(MANAGE_FACILITIES_AUTHORITY),
    },
    {
      Header: 'Name',
      accessor: 'name',
    }, {
      Header: 'Facility',
      accessor: 'parent',
    },
  ];

  static getFacilityColumns = () => [
    {
      Header: 'Actions',
      minWidth: 50,
      accessor: 'id',
      Cell: cell => (
        <div className="actions-buttons-container">
          <Link
            to={`/locations/facility/${cell.value}`}
            type="button"
            className="btn btn-primary margin-right-sm"
            title="Edit"
          >
            <span className="glyphicon glyphicon-edit" />
            <span className="hide-min-r-small-min next-button-text">Edit</span>
          </Link>
        </div>
      ),
      filterable: false,
      sortable: false,
      show: hasAuthority(MANAGE_FACILITIES_AUTHORITY),
    },
    {
      Header: 'Facility ID',
      accessor: 'facilityId',
    }, {
      Header: 'Name',
      accessor: 'name',
    }, {
      Header: 'Facility Type',
      accessor: 'facilityType',
      Filter: FacilityTypeFilter,
    }, {
      Header: 'Incharge name',
      accessor: 'inchargeFullName',
    }, {
      Header: 'Chiefdom',
      accessor: 'parent',
    },
  ];

  static getChiefdomColumns = () => [
    {
      Header: 'Name',
      accessor: 'name',
    }, {
      Header: 'District',
      accessor: 'parent',
    },
  ];

  static getDistrictColumns = () => [
    {
      Header: 'Name',
      accessor: 'name',
    },
  ];

  handleTabSelect(index) {
    this.props.match.params.tabIndex = Number.parseInt(index, 10);
    this.setState({selectedIndex: index});
  }

  render() {
    let index = Number.parseInt(this.props.match.params.tabIndex, 10);
    if (!this.props.match.params.tabIndex) {
      index = 0;
    }

    return (
      <div>
        <h1 className="page-header padding-bottom-xs margin-x-sm">Locations</h1>
        <Tabs selectedIndex={index} onSelect={this.handleTabSelect}>
          <TabList>
            <Tab>Communities</Tab>
            <Tab>Facilities</Tab>
            <Tab>Chiefdoms</Tab>
            <Tab>Districts</Tab>
          </TabList>

          <TabPanel>
            <LocationsTable
              locationType={FETCH_COMMUNITIES}
              tableColumns={Locations.getCommunityColumns()}
            />
          </TabPanel>
          <TabPanel>
            <LocationsTable
              locationType={FETCH_FACILITIES}
              tableColumns={Locations.getFacilityColumns()}
            />
          </TabPanel>
          <TabPanel>
            <LocationsTable
              locationType={FETCH_CHIEFDOMS}
              tableColumns={Locations.getChiefdomColumns()}
            />
          </TabPanel>
          <TabPanel>
            <LocationsTable
              locationType={FETCH_DISTRICTS}
              tableColumns={Locations.getDistrictColumns()}
            />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default Locations;

Locations.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tabIndex: PropTypes.number,
    }),
  }).isRequired,
};

Locations.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tabIndex: 0,
    }),
  }).isRequired,
};

FacilityTypeFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
