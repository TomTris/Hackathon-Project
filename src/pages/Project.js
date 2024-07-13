import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { slugString } from '../helpers/frontendHelper';
import ProjectDetails from '../components/ProjectDetails';
import ProjectFund from '../components/ProjectFund';

const Project = ({ projects }) => {
    const { slug } = useParams();
    const { primaryWallet } = useDynamicContext();
    const project = projects.find(p => slugString(p.name) === slug);

    if (!project || !primaryWallet) {
        return <div>Projekt nicht gefunden</div>;
    }

    return (
        <div>
            <Link to="/">
                <button>Back to Categories</button>
            </Link>
            {primaryWallet && (
                primaryWallet.address === project.moneyOwner ? 
                    <ProjectDetails project={project} primaryWallet={primaryWallet} /> : 
                    <ProjectFund project={project}  primaryWallet={primaryWallet} />
            )}
        </div>
    );
};

export default Project;
