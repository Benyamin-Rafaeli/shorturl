Cypress.Commands.add('waitForResources', (resources = []) => {
  if (Cypress.browser.family === 'firefox') {
    cy.log('Skip waitForResource in Firefox');
    return;
  }

  if (resources.length) {
    cy.log(`Waiting for idle network ${resources.join()}`);
  } else {
    cy.log('Waiting for idle network');
  }

  const timeout = Cypress.config('defaultCommandTimeout');
  const checkInternal = 500;
  const waitForIdleTimes = 1;
  let idleTimes = waitForIdleTimes;
  let resourcesLengthPrevious;
  let networkLengthPrevious;

  cy.window({ log: false }).then({ timeout }, (win) => {
    return new Cypress.Promise((resolve, reject) => {
      let foundResource;

      const interval = setInterval(() => {
        const performanceEntries = win.performance.getEntriesByType('resource');
        const resourcesLoaded = performanceEntries.filter(
          (r) => !['script', 'xmlhttprequest'].includes(r.initiatorType)
        );
        const networkRequests = performanceEntries.filter((r) =>
          ['script', 'xmlhttprequest'].includes(r.initiatorType)
        );
        const allFilesFound = resources.every((resource) => {
          const found = resourcesLoaded.filter((resourceLoaded) => {
            return resourceLoaded.name.includes(resource.name);
          });
          if (found.length === 0) {
            return false;
          }
          return !resource.number || found.length >= resource.number;
        });

        if (allFilesFound) {
          if (
            (resources.length &&
              resourcesLoaded.length === resourcesLengthPrevious) ||
            networkRequests.length === networkLengthPrevious
          ) {
            idleTimes -= 1;
          } else {
            idleTimes = waitForIdleTimes;
            resourcesLengthPrevious = resourcesLoaded.length;
            networkLengthPrevious = networkRequests.length;
          }
        }

        if (idleTimes) {
          return;
        }

        clearInterval(interval);

        resolve(cy.log('Network seems idle'));
      }, checkInternal);

      setTimeout(() => {
        if (foundResource || idleTimes === 0) {
          // nothing needs to be done, successfully found the resource
          return;
        }

        clearInterval(interval);
        reject(new Error('Timed out waiting for resource'));
      }, timeout);
    });
  });
});
