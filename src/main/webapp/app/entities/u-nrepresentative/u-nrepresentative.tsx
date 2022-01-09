import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './u-nrepresentative.reducer';
import { IUNrepresentative } from 'app/shared/model/u-nrepresentative.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UNrepresentative = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const uNrepresentativeList = useAppSelector(state => state.uNrepresentative.entities);
  const loading = useAppSelector(state => state.uNrepresentative.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="u-nrepresentative-heading" data-cy="UNrepresentativeHeading">
        <Translate contentKey="jpostgresApp.uNrepresentative.home.title">U Nrepresentatives</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="jpostgresApp.uNrepresentative.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jpostgresApp.uNrepresentative.home.createLabel">Create new U Nrepresentative</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {uNrepresentativeList && uNrepresentativeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="jpostgresApp.uNrepresentative.id">Id</Translate>
                </th>
                <th>
                  <Translate contentKey="jpostgresApp.uNrepresentative.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="jpostgresApp.uNrepresentative.gender">Gender</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {uNrepresentativeList.map((uNrepresentative, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${uNrepresentative.id}`} color="link" size="sm">
                      {uNrepresentative.id}
                    </Button>
                  </td>
                  <td>{uNrepresentative.name}</td>
                  <td>{uNrepresentative.gender}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${uNrepresentative.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${uNrepresentative.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${uNrepresentative.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="jpostgresApp.uNrepresentative.home.notFound">No U Nrepresentatives found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UNrepresentative;
