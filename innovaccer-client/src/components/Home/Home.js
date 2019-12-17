import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Col } from "reactstrap";


class Home extends Component {
	render() {
		return (
			<div className="container home-container d-flex justify-content-center align-items-center">
				<div className="card-container">
					<Row>
						<Col>
							<Link to="/deploy" style={{ textDecoration: "none" }}>
								<Card>
									<CardBody>
										<CardTitle>DEPLOY</CardTitle>
										<CardText>Deploy your prebuilt models to AWS with ease.</CardText>
									</CardBody>
								</Card>
							</Link>
						</Col>
						<Col>
							<Card>
								<Link to="/train" style={{ textDecoration: "none" }}>
									<Card>
										<CardBody>
											<CardTitle>BUILD</CardTitle>
											<CardText>Build a Machine learning model on AWS</CardText>
										</CardBody>
									</Card>
								</Link>
							</Card>
						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

export default Home;