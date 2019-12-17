import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Button, Form, Row, Col, Alert, FormGroup, Label, Input, FormText } from "reactstrap";
const API_URI = "http://localhost:8000";

const inputFormat = '{\n"data": [<inputs>]\n}'

class Deploy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			showAlert: false,
			files: '',
			api_name: '',
			type: 'image',
			uploadDisabled: false,
			url: ''
		}
	}

	handleSubmit = async (e) => {
		const { files, type, api_name } = this.state;
		const config = {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		};

		if (files.length > 0) {
			const formData = new FormData();
			formData.append("file", files[0]);
			formData.append("type", type)
			formData.append("api_name", api_name);
			try {
				this.setState({ loading: true });
				const res = await axios.post(`${API_URI}`, formData, config);
				if (res.status === 200 && res.data.success) {
					console.log(res);
					this.setState({ loading: false, showAlert: 'true', url: res.data.response });
				}
			} catch (e) {
				console.log(e);
			}
		}
	}

	handleChange = (e) => {
		const { name, value, type } = e.target;
		console.log(name, value)
		this.setState({
			[name]: value
		});
	}

	onDrop = (files) => {
		this.setState({ files });
	}

	renderFiles = files => {
		return (
			<div className="d-block">
				<div>{files[0].name}</div>
			</div>
		);
	}

	render() {
		const { files, loading, api_name, type, showAlert, url } = this.state;
		return (
			<div className="container deploy-container" style={{paddingBottom: '70px'}}>
				{showAlert && <Alert color="success">API successfully generated: {url}</Alert>}
				<h3 className="text-center mt-3">Upload the file for your model</h3>
				<div className="dropzone-container">
					{loading && (
						<div className="main-spinner d-flex justify-content-center">
							<div
								className="spinner-border text-primary"
								style={{ width: "4em", height: "4em" }}
								role="status"
							>
								<span className="sr-only">Loading...</span>
							</div>
						</div>
					)}
					<Dropzone onDrop={acceptedFiles => this.onDrop(acceptedFiles)} disabled={loading}>
						{({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
							return (
								<div {...getRootProps()} className="dropzone-model">
									<input {...getInputProps()} disabled={loading} />
									{!isDragActive && !loading && !files && "Drag or click upload"}
									{isDragActive && !isDragReject && "Drop it like it's hot!"}
									{isDragReject && "File type not accepted, sorry!"}
									{files && !loading && this.renderFiles(files)}
								</div>
							);
						}}
					</Dropzone>
				</div>

				{loading && (
					<p
						className="text-center"
						style={{ fontWeight: 700, padding: "10px", fontSize: "1.3em" }}
					>
						This will take a while so sit back and relax...
					</p>
				)}
				<div className="form-section">
					<FormGroup>
						<Label for="api_name">API Name</Label>
						<Input
							type="text"
							name="api_name"
							id="api_name"
							value={api_name}
							placeholder="Enter API Name"
							onChange={this.handleChange}
							required
						/>
					</FormGroup>
					<Row>
						<Col>
							<FormGroup tag="fieldset">
								<legend>Model Type</legend>
								<FormGroup check>
									<Label check>
										<Input
											type="radio"
											disabled={loading}
											name="type"
											value="image"
											onChange={this.handleChange}
											checked={type === "image"}
										/>{" "}
										Image Classifier
									</Label>
								</FormGroup>
								<FormGroup check>
									<Label check>
										<Input
											disabled={loading}
											type="radio"
											name="type"
											value="text"
											checked={type === "text"}
											onChange={this.handleChange}
										/>{" "}
										Text Classifier
									</Label>
								</FormGroup>
							</FormGroup>
						</Col>
						<Col>
							<div className="d-flex justify-content-end">
								<button disabled={loading} className="btn btn-primary" onClick={this.handleSubmit}>
									Submit
								</button>
							</div>
						</Col>
					</Row>
				</div>
				<div className="API documentation">
					<h4>API Documentation</h4>
					{type === "image" ? (
						<div>
							<code>
								{`
POST generated_url.com/
Content-Type: multipart/form-data; charset=utf-8
{ 
	file: image 
}
`}
							</code>
							<h4>Response</h4>
							<code>
								{" "}
								{`
Type: JSON
{
	success: boolean
	class: int,
	output: array,	
}
`}
							</code>
						</div>
					) : (
						<div>
							<code>
								{`
POST generated_url.com/
Content-Type: application/json
{ 
	data: [model_input]
}
`}
							</code>
							<h4>Response</h4>
							<code>
								{" "}
								{`
Type: JSON
{
	success: boolean
	class: int,
	output: array,	
}
`}
							</code>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Deploy;