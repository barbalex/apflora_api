/*
 * diese Views hängen von anderen ab, die in viewsGenerieren2.sql erstellt werden
 * daher muss dieser code NACH viewsGenerieren2.sql ausgeführt werden
 */

CREATE OR REPLACE VIEW v_tpop_anzkontrinklletzterundletztertpopber AS
SELECT apflora_views.v_tpop_anzkontrinklletzter.ApArtId AS "ApArtId", apflora_views.v_tpop_anzkontrinklletzter.Familie, apflora_views.v_tpop_anzkontrinklletzter.`AP Art`, apflora_views.v_tpop_anzkontrinklletzter.`AP Status`, apflora_views.v_tpop_anzkontrinklletzter.`AP Start im Jahr`, apflora_views.v_tpop_anzkontrinklletzter.`AP Stand Umsetzung`, apflora_views.v_tpop_anzkontrinklletzter.`AP verantwortlich`, apflora_views.v_tpop_anzkontrinklletzter.`Pop Guid`, apflora_views.v_tpop_anzkontrinklletzter.`Pop Nr`, apflora_views.v_tpop_anzkontrinklletzter.`Pop Name`, apflora_views.v_tpop_anzkontrinklletzter.`Pop Status`, apflora_views.v_tpop_anzkontrinklletzter.`Pop bekannt seit`, apflora_views.v_tpop_anzkontrinklletzter.`TPop ID`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Guid`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Nr`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Gemeinde`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Flurname`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Status`, apflora_views.v_tpop_anzkontrinklletzter.`TPop bekannt seit`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Status unklar`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Begruendung fuer unklaren Status`, apflora_views.v_tpop_anzkontrinklletzter.`TPop X-Koordinaten`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Y-Koordinaten`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Radius (m)`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Hoehe`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Exposition`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Klima`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Hangneigung`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Beschreibung`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Kataster-Nr`, apflora_views.v_tpop_anzkontrinklletzter.`TPop fuer AP-Bericht relevant`, apflora_views.v_tpop_anzkontrinklletzter.`TPop EigentuemerIn`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Kontakt vor Ort`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Nutzungszone`, apflora_views.v_tpop_anzkontrinklletzter.`TPop BewirtschafterIn`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Bewirtschaftung`, apflora_views.v_tpop_anzkontrinklletzter.`TPop Anzahl Kontrollen`, apflora_views.v_tpop_anzkontrinklletzter.TPopKontrId, apflora_views.v_tpop_anzkontrinklletzter.TPopId, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Guid`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Jahr`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Datum`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Typ`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr BearbeiterIn`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Ueberlebensrate`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Vitalitaet`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Entwicklung`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Ursachen`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Erfolgsbeurteilung`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Aenderungs-Vorschlaege Umsetzung`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Aenderungs-Vorschlaege Kontrolle`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr X-Koord`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Y-Koord`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Bemerkungen`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Lebensraum Delarze`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr angrenzender Lebensraum Delarze`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Vegetationstyp`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Konkurrenz`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Moosschicht`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Krautschicht`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Strauchschicht`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Baumschicht`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Bodentyp`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Boden Kalkgehalt`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Boden Durchlaessigkeit`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Boden Humusgehalt`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Boden Naehrstoffgehalt`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Oberbodenabtrag`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Wasserhaushalt`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Uebereinstimmung mit Idealbiotop`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Handlungsbedarf`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Ueberpruefte Flaeche`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Flaeche der Teilpopulation m2`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr auf Plan eingezeichnet`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Deckung durch Vegetation`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Deckung nackter Boden`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Deckung durch ueberpruefte Art`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr auch junge Pflanzen`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr maximale Veg-hoehe cm`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr mittlere Veg-hoehe cm`, apflora_views.v_tpop_anzkontrinklletzter.`Kontr Gefaehrdung`, apflora_views.v_tpop_anzkontrinklletzter.`Kontrolle zuletzt geaendert`, apflora_views.v_tpop_anzkontrinklletzter.`Kontrolle zuletzt geaendert von`, apflora_views.v_tpop_anzkontrinklletzter.Anzahlen, apflora_views.v_tpop_anzkontrinklletzter.Zaehleinheiten, apflora_views.v_tpop_anzkontrinklletzter.Methoden, apflora_views.v_tpopber_mitletzterid.AnzTPopBer, apflora_views.v_tpopber_mitletzterid.TPopBerId, apflora_views.v_tpopber_mitletzterid.`TPopBer Jahr`, apflora_views.v_tpopber_mitletzterid.`TPopBer Entwicklung`, apflora_views.v_tpopber_mitletzterid.`TPopBer Bemerkungen`, apflora_views.v_tpopber_mitletzterid.`TPopBer  MutWann`, apflora_views.v_tpopber_mitletzterid.`TPopBer MutWer`
FROM
	apflora_views.v_tpop_anzkontrinklletzter LEFT JOIN apflora_views.v_tpopber_mitletzterid ON apflora_views.v_tpop_anzkontrinklletzter.`TPop ID` = apflora_views.v_tpopber_mitletzterid.TPopId;