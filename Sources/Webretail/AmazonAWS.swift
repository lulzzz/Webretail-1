//
//  Remote.swift
//  Webretail
//
//  Created by Gerardo Grisolini on 13/01/18.
//

import Foundation

class AmazonAWS: NSObject, XMLParserDelegate {
    
    let urlString = "http://mws.amazonaws.com"
    var data: NSMutableData = NSMutableData()
    var currentElementName: String
    
    func connect(soapMessage: String) {
    
        let theRequest = NSMutableURLRequest(url: URL(string: urlString)!)
        theRequest.addValue("text/xml; charset=utf-8", forHTTPHeaderField: "Content-Type")
        theRequest.addValue(String(soapMessage.length), forHTTPHeaderField: "Content-Length")
        theRequest.httpMethod = "POST"
        theRequest.httpBody = soapMessage.data(using: String.Encoding.utf8, allowLossyConversion: false)
        
        let connection = NSURLConnection(request: theRequest as URLRequest, delegate: self, startImmediately: true)
        connection!.start()
    }
    
    func connection(didReceiveResponse: NSURLConnection!, didReceiveResponse response: URLResponse!) {
        // Recieved a new request, clear out the data object
        self.data = NSMutableData()
    }
    
    func connection(connection: NSURLConnection!, didReceiveData conData: Data!) {
        // Append the recieved chunk of data to our data object
        self.data.append(conData)
    }
    
    func connectionDidFinishLoading(connection: NSURLConnection!) {
        print(self.data)
        
        let xmlParser = XMLParser(data: self.data as Data)
        xmlParser.delegate = self
        xmlParser.parse()
        xmlParser.shouldResolveExternalEntities = true
    }

    func parser(_ parser: XMLParser, didStartElement elementName: String, namespaceURI: String?, qualifiedName qName: String?, attributes attributeDict: [String : String]) {
        currentElementName = elementName
    }
    
    func parser(_ parser: XMLParser, foundCharacters string: String) {
        if currentElementName == "FeedProcessingStatus" {
            print(string)
        }
    }
}
