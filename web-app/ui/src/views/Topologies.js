/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import {TopologyDetailRow} from "components/Tables/TopologyTable";
import { useUser } from "contexts/UserContext";

export const CreateTopologyModal = ({isOpen, toggle}) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} size="md">
        <ModalHeader toggle={toggle}>Create Topology</ModalHeader>
        <ModalBody>
          Add Topology add form here
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Create
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

const Topologies = () => {
  const { user } = useUser();

  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  return (
    <>
      <Header userObjects={user.objects} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h2 className="mb-0">Topologies</h2>
                  </div>
                  <div className="col text-right">
                    <Button color="primary" size="md" onClick={toggle}>Create</Button>
                  </div>
                  <CreateTopologyModal isOpen={modal} toggle={toggle}/>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">S. No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Networks</th>
                    <th scope="col">Virtual Machines</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                {user.objects.topologies.info &&
                  user.objects.topologies.info.map((topology) => (
                    <TopologyDetailRow topology={topology} key={topology.ID}/>
                  ))
                }
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Topologies;
