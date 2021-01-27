export const tarifergebnisText = {
  headline: 'Ihr persönliches Ergebnis',
  selbstbeteiligung: {
    label: 'Selbstbeteiligung',
    info: `Wenn Sie eine Selbstbeteiligung wählen, übernehmen Sie selbst 150 Euro von jedem Schaden. Sie profitieren in diesem Fall von niedrigeren Beiträgen.`,
    values: {
      true: '150 EUR',
      false: 'Keine'
    }
  },

  zahlungsperiode: {
    label: 'Bereich',
    info: `Je länger der Zeitraum der Vorauszahlung ist, desto günstiger wird Ihr Versicherungsschutz. Vertragslaufzeit und Kündigungsfrist werden hiervon nicht beeinflusst.`
  },

  topseller: 'am häufigsten gewählt',
  tarifAuswaehlen: 'wählen',
  tarifGewaehlt: 'gewählt',

  zusatzleistungenHeadline: 'Sinnvolle Ergänzungen zu Ihrem Versicherungsschutz',

  ueberspannungsschutz: {
    label: 'Überspannung – wenn der Blitz einschlägt',
    beschreibung: `hilft, wenn es durch Blitzeinschläge zu Überspannungsschäden kommt und z.B. Ihr Fernseher oder PC zerstört wird`,
  },

  fahrraddiebstahl: {
    label: 'Fahrrad – schützt vor Diebstahl',
    beschreibung: 'schützt Ihr Fahrrad rund um die Uhr, ob im Keller oder unterwegs',
    info: `Geben Sie den Gesamtwert aller zu versichernden Fahrräder an. Die Fahrräder müssen mit einem eigenständigen Fahrradschloss gesichert sein.`
  },

  fahrradwert: {
    label: 'Fahrradwert:',
    error: 'Bitte geben Sie den Gesamtwert aller zu versichernden Fahrräder an. Dieser darf zwischen 100 und 5000 EUR liegen.'
  },

  glasbruch: {
    label: 'Glas – wenn etwas zu Bruch geht',
    beschreibung: 'unterstützt Sie beim Bruch von Gebäude- (z.B. Fenster oder Türen) oder Mobiliarverglasung (z.B. Ceranfeld)',
  },

  elementarschaeden: {
    label: 'Naturgefahren – wenn das Wetter verrücktspielt',
    beschreibung: `schützt Sie bei Schäden durch das Wirken der Natur, wie z.B.: Überschwemmung witterungsbedingter Rückstau, Erdbeben, Erdrutsch, Erdsenkung, Lawinen, Schneedruck`,
    info: `Bitte beachten Sie, dass für diesen Zusatzschutz eine Wartezeit von 14 Tagen besteht und eine Selbstbeteiligung von 200 EUR je Versicherungsfall gilt.`
  },

  zusatzleistungAuswaehlen: 'Auswählen',
  zusatzleistungGewaehlt: 'Ausgewählt',

  downloadTarifdetailsLink: 'Leistungsübersicht herunterladen (PDF)',
  linkTarifdetails: 'https://www.ruv.de/dam/jcr/privatkunden/downloads/hausrat-leistungsuebersicht.pdf',

  tarife: {
    basic: {
      defaultPreis: '59,99 EUR',
      tarifdetails: [
        'Sie haben ',
        'Außenversicherungsschutz (z.B. im Urlaub) für 6 Monate',
        'Wertsachen (z.B. Schmuck und Bargeld) sind bis zu 200 EUR je m² Wohnfläche mitversichert'
      ],
      versicherungsbedingungen_link: `
      https://www.ruv.de/dam/jcr/privatkunden/downloads/versicherungsbedingungen/versicherungsbedingungen-hausrat-basic.pdf`
    },
    classic: {
      defaultPreis: '99,99 EUR',
      tarifdetails: [
        'keine Begrenzung der Versicherungssumme und Neuwertersatz',
        'Außenversicherungsschutz (z.B. im Urlaub) für 6 Monate',
        'Wertsachen (z.B. Schmuck und Bargeld) sind bis zu 200 EUR je m² Wohnfläche mitversichert',
        'grobe Fahrlässigkeit bei Herbeiführung von Versicherungsfällen',
        'Einbruchdiebstahl aus dem Auto',
        'Innovationsgarantie'
      ],
      versicherungsbedingungen_link: `
      https://www.ruv.de/dam/jcr/privatkunden/downloads/versicherungsbedingungen/versicherungsbedingungen-hausrat-classic.pdf`
    },
    comfort: {
      defaultPreis: '129,99 EUR',
      tarifdetails: [
        'keine Begrenzung der Versicherungssumme und Neuwertersatz',
        'Außenversicherungsschutz (z.B. im Urlaub) für 12 Monate',
        'Wertsachen (z.B. Schmuck und Bargeld) sind bis zu 200 EUR je m² Wohnfläche mitversichert',
        'grobe Fahrlässigkeit bei Herbeiführung von Versicherungsfällen',
        'Einbruchdiebstahl aus dem Auto',
        'Innovationsgarantie',
        'Sturm- und Hagelschäden bei Gartenmöbeln und -inventar (z.B. Trampolin)',
        'Trickdiebstahl in der Wohnung'
      ],
      versicherungsbedingungen_link:
        `https://www.ruv.de/dam/jcr/privatkunden/downloads/versicherungsbedingungen/versicherungsbedingungen-hausrat-comfort.pdf`
    }
  },
  preisanzeige: {
    beitragText: 'Beitrag für Ihre',
    steuerInfo: '(inkl. 16,15% Versicherungssteuer)'
  },

  buttons: {
    weiter: 'Weiter'
  }


};
