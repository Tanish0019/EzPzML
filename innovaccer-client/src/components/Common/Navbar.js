import React, { useState } from "react";
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink
} from "reactstrap";

const Example = props => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
			<Navbar expand="md">
				<NavbarBrand href="/"><img src="/images/logo.png" /></NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink href="/">Home</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/deploy">Deploy</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/train">Train</NavLink>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
	);
};

export default Example;
