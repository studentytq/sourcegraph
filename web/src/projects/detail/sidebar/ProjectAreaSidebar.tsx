import FolderTextIcon from 'mdi-react/FolderTextIcon'
import HomeVariantIcon from 'mdi-react/HomeVariantIcon'
import SettingsIcon from 'mdi-react/SettingsIcon'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ExtensionsControllerProps } from '../../../../../shared/src/extensions/controller'
import * as GQL from '../../../../../shared/src/graphql/schema'
import { CollapsibleSidebar } from '../../../components/collapsibleSidebar/CollapsibleSidebar'
import { RulesIcon } from '../../../enterprise/a8n/icons'
import { ChecksIcon } from '../../../enterprise/checks/icons'
import { LabelIcon } from '../../../enterprise/labels/icons'
import { ThreadsIcon } from '../../../enterprise/threadsOLD/icons'
import { NavItemWithIconDescriptor } from '../../../util/contributions'
import { GitPullRequestIcon, ZapIcon } from '../../../util/octicons'
import { ProjectAvatar } from '../../components/ProjectAvatar'

interface Props extends ExtensionsControllerProps {
    project: GQL.IProject
    projectURL: string
    className?: string
}

const LINKS: NavItemWithIconDescriptor[] = [
    { to: '', label: 'Project', icon: HomeVariantIcon, exact: true },
    { to: '/tree', label: 'Repository', icon: FolderTextIcon },
    { to: '/changesets', label: 'Changesets', icon: GitPullRequestIcon },
    { to: '/rules', label: 'Rules', icon: ZapIcon },
    // { to: '/checks', label: 'Checks', icon: ChecksIcon },
    { to: '/threads', label: 'Threads', icon: ThreadsIcon },
    { to: '/labels', label: 'Labels', icon: LabelIcon },
    { to: '/settings', label: 'Settings', icon: SettingsIcon },
]

/**
 * The sidebar for the project area (for a single project).
 */
export const ProjectAreaSidebar: React.FunctionComponent<Props> = ({ project, projectURL, className = '' }) => (
    <CollapsibleSidebar
        localStorageKey="project-area__sidebar"
        side="left"
        className={`project-area-sidebar d-flex flex-column ${className}`}
        collapsedClassName="project-area-sidebar--collapsed"
        expandedClassName="project-area-sidebar--expanded"
    >
        {expanded => (
            <>
                <h3 className="mb-0">
                    <Link
                        to={projectURL}
                        className="project-area-sidebar__nav-link d-block text-decoration-none shadow-none text-body p-3 text-truncate h5 mb-2"
                        data-tooltip={expanded ? '' : project.name}
                    >
                        <ProjectAvatar
                            project={project}
                            className={`project-area-sidebar__avatar ${expanded ? 'mr-3' : ''}`}
                        />
                        {expanded && project.name}
                    </Link>
                </h3>
                <ul className="list-group list-group-flush">
                    {LINKS.map(({ to, label, icon: Icon, exact }, i) => (
                        <li key={i} className="nav-item">
                            <NavLink
                                to={projectURL + to}
                                exact={exact}
                                className="project-area-sidebar__nav-link nav-link p-3 text-nowrap d-flex align-items-center"
                                activeClassName="project-area-sidebar__nav-link--active"
                                data-tooltip={expanded ? '' : label}
                            >
                                {Icon && <Icon className="project-area-sidebar__icon" />}{' '}
                                {expanded && <span className="ml-3">{label}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </>
        )}
    </CollapsibleSidebar>
)
