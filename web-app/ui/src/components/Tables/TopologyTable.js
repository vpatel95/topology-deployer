import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Collapse,
  Table,
  Row
} from "reactstrap";
import { TableHeader } from "./TableHeader";
import { getMemory, getFlavor, getNetworkType } from "utils";
import {Link} from "react-router-dom";

const TopologyNetworkDetail = ({tname, networks}) => {
  return (
    <Row className="mb-3">
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0">
            <h3>{ tname } Networks</h3>
          </CardHeader>
          <CardBody>
            <Row>
            { networks &&
              networks.map((network) => (
                <Col xs={12} sm={6} lg={4} key={tname + "-net" + network.ID} >
                  <Card className="shadow mb-3" outline color="dark">
                    <CardHeader className="border-0">
                      <h3 className="mb-0">{network.name}</h3>
                    </CardHeader>
                    <Table striped responsive>
                      <tbody>
                        <tr>
                          <th>Type</th><td>{getNetworkType(network.Type)}</td>
                        </tr>
                        <tr>
                          <th>IPv4 Subnet</th><td>{network.subnet4}</td>
                        </tr>
                        { network.has_v6 && (
                          <tr>
                            <th>IPv6 Subnet</th><td>{network.subnet6}</td>
                          </tr>
                          )
                        }
                        <tr>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </Col>
              ))
            }
            </Row>
          </CardBody>
        </Card>
      </div>
    </Row>
  );
};

const TopologyVmDetail = ({tname, vms}) => {
  return (
    <Row className="mb-3">
      <div className="col">
        <Card className="shadow">
          <CardHeader className="border-0">
            <h2>{ tname } Virtual Machines</h2>
          </CardHeader>
          <CardBody>
            <Row>
            { vms &&
              vms.map((vm) => (
                <Col xs={12} sm={6} lg={3} key={tname + "-vm" + vm.ID} >
                  <Card className="shadow">
                    <CardHeader className="border-0">
                      <h3 className="mb-0">{vm.name}</h3>
                    </CardHeader>
                    <Table striped responsive>
                      <tbody>
                        <tr>
                          <th>Flavor</th><td>{getFlavor(vm.flavor)}</td>
                        </tr>
                        <tr>
                          <th>Memory</th><td>{getMemory(vm.ram)}</td>
                        </tr>
                        <tr>
                          <th>vCPUs</th><td>{vm.vcpu}</td>
                        </tr>
                        <tr>
                          <th>Disk</th><td>{vm.disk}</td>
                        </tr>
                        <tr>
                          <th>VNC Port</th><td>{vm.vnc_port}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card>
                </Col>
              ))
            }
            </Row>
          </CardBody>
        </Card>
      </div>
    </Row>
  );
};

export const TopologyDetailRow = ({topology}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [icon, setIcon] = React.useState("down");

  const toggle = () => {
    setIsOpen(!isOpen);
    if (icon === "down") {
      setIcon("up");
    } else {
      setIcon("down");
    }
  }

  return (
    <>
    <tr key={topology.ID}>
      <th scope="row">
        <span className="mb-0 text-sm">
          {topology.ID}
        </span>
      </th>
      <td>{topology.name}</td>
      <td>{topology.Networks.length}</td>
      <td>{topology.VirtualMachines.length}</td>
      <td className="text-right">
        <i className={"fas fa-chevron-" + icon} id={"topology" + topology.ID}
            onClick={toggle} />
      </td>
    </tr>
    <tr key={topology.ID + "-details"} >
      <td className="p-0" colSpan="5">
        <Collapse isOpen={isOpen}>
          <Card>
            <CardBody>
              <TopologyNetworkDetail tname={topology.name} networks={topology.Networks}/>
              <TopologyVmDetail tname={topology.name} vms={topology.VirtualMachines}/>
            </CardBody>
          </Card>
        </Collapse>
      </td>
    </tr>
    </>
  );
};

export const TopologyTableRow = ({topologies}) => {
  return (
    <tbody>
    {topologies &&
      topologies.map((topology) => (
        <tr key={topology.ID}>
          <th scope="row">{topology.name}</th>
          <td>{topology.Networks.length}</td>
          <td>{topology.VirtualMachines.length}</td>
        </tr>
      ))
    }
    </tbody>
  );
};

export const TopologyTable = ({headers, topologies}) => {
  return (
    <Card className="shadow mb-3">
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">Topologies</h3>
          </div>
          <div className="col text-right">
            <Link to="/user/topologies">
              <Button color="primary" size="sm"> See all </Button>
            </Link>
          </div>
        </Row>
      </CardHeader>
      <Table className="align-items-center table-flush" responsive>
        <TableHeader headers={headers} />
        <TopologyTableRow topologies={topologies} />
      </Table>
    </Card>
  );
};
