import {
    useState,
    useEffect,
} from 'react';

import {
    Link,
} from 'react-router-dom';

export interface TopoSummaryProps {
    topology: any;
}

const TopologySummary = ({topology}: TopoSummaryProps) => {
    const [networks, setNetworks] = useState(Array<any>);
    const [vms, setVms] = useState(Array<any>);

    useEffect(() => {
        if (!topology) {
            console.log("empty topo");
            return;
        }

        setNetworks(topology['Networks']);
        setVms(topology['VirtualMachines']);
    }, [topology]);

    return (
        <>
        {topology &&
        <div className="card text-bg-light mb-3 col-sm-3">
            <div className="card-header">{topology['name']}</div>
            <div className="card-body">
                <ul className="card-text">
                    <li>VMs : {vms.length}</li>
                    <li>Networks : {networks.length}</li>
                </ul>
                <Link to={'/dummy'} className="card-link">Networks</Link>
                <Link to={'/dummy'} className="card-link">VMs</Link>
            </div>
        </div>
        }
        </>
    )
}

export default TopologySummary;
