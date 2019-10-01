/**
 * @license Copyright 2019 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

import {h} from 'preact';
import clsx from 'clsx';
import {ScoreWord} from '../../../components/score-icon';
import {TableDetails} from './table-details';
import {NumericDiff} from '../audit-list/numeric-diff';
import {getDiffLabel} from '@lhci/utils/src/audit-diff-finder';

/** @param {{pair: LHCI.AuditPair, diff: LHCI.AuditDiff}} props */
const ScoreOnlyDetails = props => {
  const {audit, baseAudit} = props.pair;
  if (!baseAudit) return null;

  return (
    <div className="audit-detail-pane__audit-details--binary">
      <ScoreWord audit={baseAudit} />
      <i
        className={`material-icons audit-group__diff-arrow audit-group__diff-arrow--${getDiffLabel(
          props.diff
        )}`}
      >
        arrow_forward
      </i>
      <ScoreWord audit={audit} />
    </div>
  );
};

/** @param {{pair: LHCI.AuditPair, key?: string}} props */
const Details = props => {
  const {details} = props.pair.audit;
  const type = details && details.type;
  if (type === 'table' || type === 'opportunity') return <TableDetails pair={props.pair} />;

  const diffs = props.pair.diffs;
  const numericDiff = diffs.find(diff => diff.type === 'numericValue');
  if (numericDiff && numericDiff.type === 'numericValue') return <NumericDiff diff={numericDiff} />;

  const scoreDiff = diffs.find(diff => diff.type === 'score');
  if (scoreDiff && scoreDiff.type === 'score')
    return <ScoreOnlyDetails diff={scoreDiff} pair={props.pair} />;

  return <pre>{JSON.stringify(props.pair, null, 2)}</pre>;
};

/** @param {{pair: LHCI.AuditPair, key?: string}} props */
export const AuditDetail = props => {
  const {audit} = props.pair;

  return (
    <div id={`audit-detail-pane-audit--${audit.id}`} className={clsx('audit-detail-pane__audit')}>
      <div className="audit-detail-pane__audit-title">{audit.title}</div>
      <div className="audit-detail-pane__audit-description">{audit.description}</div>
      <div className="audit-detail-pane__audit-details">
        <Details pair={props.pair} />
      </div>
    </div>
  );
};
