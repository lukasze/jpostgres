import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './enginier.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const EnginierDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const enginierEntity = useAppSelector(state => state.enginier.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="enginierDetailsHeading">
          <Translate contentKey="jpostgresApp.enginier.detail.title">Enginier</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="jpostgresApp.enginier.id">Id</Translate>
            </span>
          </dt>
          <dd>{enginierEntity.id}</dd>
          <dt>
            <span id="fullName">
              <Translate contentKey="jpostgresApp.enginier.fullName">Full Name</Translate>
            </span>
          </dt>
          <dd>{enginierEntity.fullName}</dd>
          <dt>
            <span id="mobile">
              <Translate contentKey="jpostgresApp.enginier.mobile">Mobile</Translate>
            </span>
          </dt>
          <dd>{enginierEntity.mobile}</dd>
          <dt>
            <Translate contentKey="jpostgresApp.enginier.car">Car</Translate>
          </dt>
          <dd>{enginierEntity.car ? enginierEntity.car.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/enginier" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/enginier/${enginierEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default EnginierDetail;
