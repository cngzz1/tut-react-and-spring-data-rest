'use strict';

// tag::vars[]
import { Component } from 'react'; // <1>
import { render as _render } from 'react-dom'; // <2>
import client from './client'; // <3>
// end::vars[]

// tag::app[]
// top level component
class App extends Component { // <1>

	constructor(props) {
		super(props);
		// An array of employees is fetched from Spring Data
		// Rest backend and stored in this component's "state" data

		// State is data that the component is expected to handle itself
		// Can fluctuate and change
		this.state = {employees: []};
	}
    // this API is invoked after React renders a component in the DOM
	componentDidMount() { // <2>
		client({method: 'GET', path: '/api/employees'}).done(response => {
			this.setState({employees: response.entity._embedded.employees});
		});
	}
    // this API draws the component on the screen
	render() { // <3>
		return (
			<EmployeeList employees={this.state.employees}/>
		)
	}
}
// end::app[]

// tag::employee-list[]
class EmployeeList extends Component{
	render() {
	// Using js map function ,this.props.employees is transformed
	// from array of employee records into an array of <Element> components
		const employees = this.props.employees.map(employee =>
		// This listing creates a new React component with two properties
		// "key" and "data"
		// they are supplied from "employee._links.self.href"
		// and "employee" respectively
			<Employee key={employee._links.self.href} employee={employee}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Description</th>
					</tr>
					{employees}
				</tbody>
			</table>
		)
	}
}
// end::employee-list[]

// tag::employee[]
// Define what an "<Employee />" component is
class Employee extends Component{
	render() {
		return (
			<tr>
			// the properties itself is "this.props.employee"
				<td>{this.props.employee.firstName}</td>
				<td>{this.props.employee.lastName}</td>
				<td>{this.props.employee.description}</td>
			</tr>
		)
	}
}
// end::employee[]

// tag::render[]
// This is where <div id="react"></div> is picked up from html page and plugged in
_render(
	<App />,
	document.getElementById('react')
)
// end::render[]

// tag::<1>
// const React = require('react);
// end::<1>


// const ReactDOM = require('react-dom');
//ReactDOM is a package that serves as entrypoint
