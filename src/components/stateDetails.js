import React from "react";
import { Card, Collapse } from "reactstrap";
import BarChart from "./barChart";
import DoughnutChart from "./doughnutChart";

class StateDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            showDetails: ""
        }
    }

    showDetails = (id) => {
        this.setState(prevState => {
            if(prevState.showDetails === id) {
                return {showDetails: ""}
            }
            else {
                return {showDetails: id}
            }
        });
    }

    render() {
        const DATA = this.props.data;
        return(
            <>
                <header className="d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-start">
                                <span id="home_btn" onClick={() => this.props.history.goBack()}><i class="fa fa-caret-left"></i> Home</span> / {DATA.statename}
                            </div>
                        </div>
                    </div>
                </header>
                <main className="container pt-5">
                    <section className="row my-5">
                        <div className="col-12">
                            {/* <span className="state-code">{DATA.statecode}</span> */}
                            <h2>{DATA.statename}</h2>
                        </div>
                    </section>
                    <section className="row justify-content-around">
                        <div className="col-10 col-md-3 mb-5">
                            <div className="tile-small">
                                <span className="count-active">{DATA.activeState.toLocaleString('en-IN')}</span>
                                <span className="label">Active</span>
                            </div>
                        </div>
                        <div className="col-10 col-md-3 mb-5">
                            <div className="tile-small">
                                <span className="count-recovered">{DATA.recoveredState.toLocaleString('en-IN')}</span>
                                <span className="label">Recovered</span>
                            </div>
                        </div>
                        <div className="col-10 col-md-3 mb-5">
                            <div className="tile-small">
                                <span className="count-deceased">{DATA.deceasedState.toLocaleString('en-IN')}</span>
                                <span className="label">Deaths</span>
                            </div>
                        </div>
                    </section>
                    <section className="row my-5">
                        <div id="b_chart_wrapper" className="col-12">
                            <BarChart page="state" data={this.props.data.districtData} />
                        </div>
                    </section>
                    <section className="row my-5 justify-content-center">
                        <div className="col-12 col-md-8 search-input">
                            <input id="search_state" placeholder="Search states..." value={this.state.search} onChange={(e) => this.setState({search : e.target.value})} />
                            <i class="fa fa-search fa-lg"></i>
                        </div>
                    </section>
                    <section className="row px-3 mb-5 justify-content-center">
                        {Object.keys(DATA.districtData).length === 0 ? null :
                        Object.keys(DATA.districtData).map(key =>
                            key.toLowerCase().includes(this.state.search.toLowerCase()) ?
                            <div key={key} className="col-12 col-md-8 mb-3 district">
                                <div className="d-flex justify-content-between">
                                    <span className="label">{key}</span>
                                    <button className="show-details-btn" onClick={() => this.showDetails(key.split(" ").join(""))}>{this.state.showDetails === key.split(" ").join("") ? "Hide Details" : "Show Details"}</button>
                                </div>
                                <div>
                                    <Collapse isOpen={this.state.showDetails === key.split(" ").join("")}>
                                        <table className="mt-3">
                                            <tr className="d-flex justify-content-between mb-1 pb-1">
                                                <td>Confirmed</td>
                                                <td>{DATA.districtData[key].confirmed.toLocaleString('en-IN')}</td>
                                            </tr>
                                            <tr className="d-flex justify-content-between mb-1 pb-1">
                                                <td>Active</td>
                                                <td>{DATA.districtData[key].active.toLocaleString('en-IN')}</td>
                                            </tr>
                                            <tr className="d-flex justify-content-between mb-1 pb-1">
                                                <td>Recovered</td>
                                                <td>{DATA.districtData[key].recovered.toLocaleString('en-IN')}</td>
                                            </tr>
                                            <tr className="d-flex justify-content-between mb-1 pb-1">
                                                <td>Deaths</td>
                                                <td>{DATA.districtData[key].deceased.toLocaleString('en-IN')}</td>
                                            </tr>
                                        </table>
                                        
                                    </Collapse>
                                    {this.state.showDetails === key.split(" ").join("") &&
                                    <div className="mt-3 d-flex justify-content-center">
                                        <DoughnutChart active={DATA.districtData[key].active} recovered={DATA.districtData[key].recovered} deceased={DATA.districtData[key].deceased} />
                                    </div>}
                                </div>
                            </div> : null
                        )}
                    </section>
                </main>
            </>
        )
    }
}

export default StateDetails;