import EnhancedTable from "./../Table/EnhancedTable";
import PropTypes from 'prop-types';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {showMetadataEditor} from './../../../shared/actions/metadata';

import { localizer } from './../../../shared/l10n/localize';
const { localize } = localizer;

const {ipcRenderer} = require('electron');
import classNames from 'classnames';

const styles = theme => ({
  editButton: {
    'float': 'right',
  },
  kbLink: {
    'text-align': 'right',
    'display': 'block',
    'margin-right': '1em',
  },
});

const KB_BASE = 'http://kb.daisy.org/publishing/';

// http://kb.daisy.org/publishing/docs/metadata/schema-org.html
// http://kb.daisy.org/publishing/docs/metadata/evaluation.html
//
// const a11yMeta_links = [
//   "a11y:certifierReport", //(link in EPUB3)
//   "dcterms:conformsTo", //(link in EPUB3)
// ];
// const a11yMeta = [
//   "schema:accessMode",
//   "schema:accessibilityFeature",
//   "schema:accessibilityHazard",
//   "schema:accessibilitySummary",
//   "schema:accessModeSufficient",
//   "schema:accessibilityAPI",
//   "schema:accessibilityControl",
//   "a11y:certifiedBy",
//   "a11y:certifierCredential", //(MAY BE link in EPUB3)
// ].concat(a11yMeta_links);

const A11Y_META = {
  'schema:accessMode': {
    required: true,
    allowedValues: [
      'auditory',
      'tactile',
      'textual',
      'visual',
      'chartOnVisual',
      'chemOnVisual',
      'colorDependent',
      'diagramOnVisual',
      'mathOnVisual',
      'musicOnVisual',
      'textOnVisual',
    ]
  },
  'schema:accessModeSufficient': {
    recommended: true,
    allowedValues: [
      'auditory',
      'tactile',
      'textual',
      'visual',
      'chartOnVisual',
      'chemOnVisual',
      'colorDependent',
      'diagramOnVisual',
      'mathOnVisual',
      'musicOnVisual',
      'textOnVisual',
    ]
  },
  'schema:accessibilityAPI': {
    allowedValues: [
      'ARIA'
    ]
  },
  'schema:accessibilityControl': {
    allowedValues: [
      'fullKeyboardControl',
      'fullMouseControl',
      'fullSwitchControl',
      'fullTouchControl',
      'fullVideoControl',
      'fullAudioControl',
      'fullVoiceControl',
    ]
  },
  'schema:accessibilityFeature': {
    required: true,
    allowedValues: [
      'alternativeText',
      'annotations',
      'audioDescription',
      'bookmarks',
      'braille',
      'captions',
      'ChemML',
      'describedMath',
      'displayTransformability',
      'highContrastAudio',
      'highContrastDisplay',
      'index',
      'largePrint',
      'latex',
      'longDescription',
      'MathML',
      'none',
      'printPageNumbers',
      'readingOrder',
      'rubyAnnotations',
      'signLanguage',
      'structuralNavigation',
      'synchronizedAudioText',
      'tableOfContents',
      'taggedPDF',
      'tactileGraphic',
      'tactileObject',
      'timingControl',
      'transcript',
      'ttsMarkup',
      'unlocked',
    ],
  },
  'schema:accessibilityHazard': {
    allowedValues: [
      'flashing',
      'noFlashingHazard',
      'motionSimulation',
      'noMotionSimulationHazard',
      'sound',
      'noSoundHazard',
      'unknown',
      'none',
    ]
  },
  'schema:accessibilitySummary': {
    required: true,
  }
};

// the metadata page of the report
class Metadata extends React.Component {

  static propTypes = {
    metadata: PropTypes.array.isRequired,
    a11ymetadata: PropTypes.object.isRequired,
    filters: PropTypes.object.isRequired,
    pagination: PropTypes.object.isRequired,
    sort: PropTypes.object.isRequired,
    expandFilters: PropTypes.bool.isRequired,
    setTableSort: PropTypes.func.isRequired,
    setTableFilterValues: PropTypes.func.isRequired,
    setTablePagination: PropTypes.func.isRequired,
    setTableFiltersExpanded: PropTypes.func.isRequired
  };

  onKBSchemaOrg = () => {
    const url = `${KB_BASE}docs/metadata/schema-org.html`;
    ipcRenderer.send('KB_URL', url);
    // shell.openExternal(url);
  }
  onKBEvaluation = () => {
    const url = `${KB_BASE}docs/metadata/evaluation.html`;
    ipcRenderer.send('KB_URL', url);
    // shell.openExternal(url);
  }
  onKB = () => {
    this.onKBSchemaOrg();
    this.onKBEvaluation();
  }

  render() {
    let {
      classes,
      metadata,
      a11ymetadata,
      filters,
      pagination,
      sort,
      expandFilters,
      setTableSort,
      setTableFilterValues,
      setTablePagination,
      setTableFiltersExpanded} = this.props;

    let hasMissingOrEmpty = a11ymetadata.missing.length > 0 || a11ymetadata.empty.length > 0;
    let heads = [
      {
        id: 'name',
        label: localize("report.metadataSection.name"),
        numeric: false,
        sortable: true,
        filterOn: obj => obj,
        makeCell: (row, idx) =>
          <TableCell key={idx}>
            {row.name}
          </TableCell>
      },
      {
        id: 'value',
        label: localize("report.metadataSection.value"),
        numeric: false,
        sortable: false,
        makeCell: (row, idx) =>
          <TableCell key={idx}>{row.value instanceof Array ?
              <ul>{row.value.map((data, idx) => {
                return (
                  <li key={idx}>{data}</li>
                );
              })}
              </ul>
              : row.value}
          </TableCell>
      },
      {
        id: 'a11y',
        label: localize("report.metadataSection.a11y"),
        numeric: false,
        sortable: true,
        makeCell: (row, idx) =>
          <TableCell key={idx}>
            {row.a11y}
          </TableCell>
      }
    ];

    return (
      <section className="report-section metadata">
        <h2>{localize("report.metadata")}</h2>
        <EnhancedTable
          rows={metadata}
          heads={heads}
          id={'metadata'}
          isPaginated={true}
          filters={filters}
          sort={sort}
          pagination={pagination}
          expandFilters={expandFilters}
          onSort={setTableSort}
          onFilter={setTableFilterValues}
          onChangePagination={setTablePagination}
          onExpandFilters={setTableFiltersExpanded}
        />

      <h2>{localize("report.metadataSection.missing")}</h2>
      {hasMissingOrEmpty ?
        <ul>
          {a11ymetadata.missing && a11ymetadata.missing.sort().map((data, idx) => {
            let suffix = "";
            if (data in A11Y_META) {
              if (A11Y_META[data].required || A11Y_META[data].recommended) {
                suffix = ` (${A11Y_META[data].required ? localize("report.summarySection.serious") : localize("report.summarySection.moderate")})`
              }
            }
            
            return (<li key={idx}>{data}{suffix}</li>);
          })}
          {a11ymetadata.empty && a11ymetadata.empty.sort().map((data, idx) => {
            let suffix = "";
            if (data in A11Y_META) {
              if (A11Y_META[data].required || A11Y_META[data].recommended) {
                suffix = ` (${A11Y_META[data].required ? localize("report.summarySection.critical") : localize("report.summarySection.moderate")})`
              }
            }
            
            return (<li key={idx}>{data}{suffix}</li>);
          })}
        </ul>
        :
        <p>{localize("report.metadataSection.allPresent")}</p>
      }
      <a
          tabIndex={0}
          className={classNames(classes.kbLink, 'external-link')}
          onKeyPress={(e) => { if (e.key === "Enter") { this.onKB(); }}}
          onClick={() => this.onKB()}
          >{`${localize("menu.knowledgeBase")} (${localize("menu.help")})`}</a>

      <hr/>
      <Button onClick={this.props.showMetadataEditor} className={classes.editButton}>
        {`${localize("metadata.edit")} ...`}
      </Button>

     </section>
    );
  }
}
function mapStateToProps(state) {
  let { app: {processing: {ace}, inputPath, reportPath, epubBaseDir} } = state;
  return {
    inputPath,
    reportPath,
    epubBaseDir,
    processing: ace,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({showMetadataEditor}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Metadata));
