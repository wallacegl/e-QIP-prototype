import PsychologicalValidator, { showQuestion21E, hideExistingConditions } from './psychological'

describe('Psychologicalvalidation', function () {
  it('Should validate completion status', function () {
    const tests = [
      {
        props: {
          Completed: {
            Competence: {
              status: true
            }
          }
        },
        Status: {
          Competence: {
            status: true
          }
        },
        expected: 'neutral'
      },
      {
        props: {
          Completed: {
            Competence: {
              status: true
            }
          }
        },
        Status: {
          Competence: {
            status: false
          }
        },
        expected: 'incomplete'
      },
      {
        props: {
          Psychological: {
            Competence: {
              IsIncompetent: 'No'
            },
            Consultation: {
              Consulted: 'No'
            },
            Diagnoses: {
              Diagnosed: 'No'
            },
            Hospitalization: {
              Hospitalized: 'No'
            }
          },
          Completed: {
            Competence: {
              status: true
            }
          }
        },
        Status: {
          Competence: {
            status: false
          }
        },
        expected: 'incomplete'
      },
      {
        props: {
          Completed: {
            Competence: {
              status: true
            },
            Consultations: {
              status: true
            },
            Hospitalizations: {
              status: true
            },
            Diagnoses: {
              status: true
            },
            ExistingConditions: {
              status: true
            }
          }
        },
        Status: {
          Competence: {
            status: true
          },
          Consultations: {
            status: true
          },
          Hospitalizations: {
            status: true
          },
          Diagnoses: {
            status: true
          },
          ExistingConditions: {
            status: true
          }
        },
        expected: 'complete'
      }
    ]

    tests.forEach(test => {
      expect(new PsychologicalValidator(null, test.props).completionStatus(test.Status)).toBe(test.expected)
    })
  })

  it('Should determine when to show question 21E', function () {
    const tests = [
      {
        props: {
          Psychological: {
            Competence: {
              IsIncompetent: 'No'
            },
            Consultation: {
              Consulted: 'No'
            },
            Diagnoses: {
              Diagnosed: 'No'
            },
            Hospitalization: {
              Hospitalized: 'No'
            }
          },
          Completed: {
            Competence: {
              status: true
            }
          }
        },
        expected: true
      },
      {
        props: {
          Psychological: {
            Competence: {
              IsIncompetent: 'Yes'
            },
            Consultation: {
              Consulted: 'No'
            },
            Diagnoses: {
              Diagnosed: 'No'
            },
            Hospitalization: {
              Hospitalized: 'No'
            }
          },
          Completed: {
            Competence: {
              status: true
            }
          }
        },
        expected: false
      }
    ]

    tests.forEach(test => {
      expect(showQuestion21E(test.props.Psychological)).toBe(test.expected)
    })
  })
})
