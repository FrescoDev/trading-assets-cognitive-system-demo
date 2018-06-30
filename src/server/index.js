require('babel-core/register');
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express');
const helmet = require('helmet');
const methodOverride = require('method-override');
const Router = require('express').Router;
const bunyanMiddleware = require('bunyan-middleware');
const bunyan = require('bunyan');
const app = express();
const handleCapabilitySelection = require('./handle-capability-selection');
const handleFactObservation = require('./handle-fact-observation');
const getFactFindInterface = require('./get-fact-find-interface');
const getSelectionInterface = require('./get-selection-interface');
const getSelectionInterfaceV2 = require('./get-selection-interface-v2');
const getKnowledgeInterface = require('./get-knowledge-interface');

// Define bunyan logger
const logger = bunyan.createLogger({
  name: 'trading-assets-cognitive-system',
  serializers: bunyan.stdSerializers,
  streams: [{
    level: 'info',
    stream: process.stdout
  }]
});

const requestLogger = bunyanMiddleware({
  logger: logger,
  headerName: 'trading-assets-cognitive-system',
  obscureHeaders: ['authorization', 'token', 'access_token','referer'],
  level: (process.env.NODE_ENV === 'development') ? 'debug' : 'info'
});

// Add all HTTP methods
app.use(methodOverride());

// Properly Decode JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Specify handler route
const routes = new Router()
  .use(requestLogger)
  
  .get('/select', getSelectionInterface)
  .get('/select-2', getSelectionInterfaceV2)
  .post('/api/selection', handleCapabilitySelection)

  .get('/facts', getFactFindInterface)
  .post('/api/facts', handleFactObservation)

  .get('/knowledge', getKnowledgeInterface)
  
  .get('/', getSelectionInterface);

// Adds some security best practices
app.use(helmet());
app.use(cors());

// Mount API routes
app.use('/', routes)

const port = 3030;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`
    === App Server ===
    Connected on:
    
    Port: ${port}
    Env: ${app.get('env')}
    
  `)
});

module.exports = app;

