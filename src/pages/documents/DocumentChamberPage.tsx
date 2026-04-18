import React, { useState } from 'react';
import { FileDown, Upload, PenTool, FileCheck, FileWarning, Eye, Search, X, Check, Clock } from 'lucide-react';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

type DocStatus = 'Draft' | 'In Review' | 'Signed';

interface Document {
  id: string;
  name: string;
  status: DocStatus;
  date: string;
  size: string;
}

const mockDocs: Document[] = [
  { id: '1', name: 'Series A Term Sheet.pdf', status: 'Signed', date: '2024-03-01', size: '2.4 MB' },
  { id: '2', name: 'Founder Agreement_v2.pdf', status: 'In Review', date: '2024-03-10', size: '1.1 MB' },
  { id: '3', name: 'NDA_TechWave.docx', status: 'Draft', date: '2024-03-15', size: '542 KB' }
];

export const DocumentChamberPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocs);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(mockDocs[1]);
  const [isSigning, setIsSigning] = useState(false);

  const getStatusBadge = (status: DocStatus) => {
    switch (status) {
      case 'Draft': return <Badge variant="gray" className="flex items-center gap-1"><FileWarning size={12}/> Draft</Badge>;
      case 'In Review': return <Badge variant="accent" className="flex items-center gap-1"><Clock size={12}/> In Review</Badge>;
      case 'Signed': return <Badge variant="success" className="flex items-center gap-1"><FileCheck size={12}/> Signed</Badge>;
    }
  };

  const handleSign = () => {
    if (selectedDoc) {
      setDocuments(docs => docs.map(d => d.id === selectedDoc.id ? { ...d, status: 'Signed' } : d));
      setSelectedDoc({ ...selectedDoc, status: 'Signed' });
      setIsSigning(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative h-full">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-500">Document Chamber</h1>
          <p className="text-gray-500 mt-1">Secure processing, review, and e-signatures for your deals.</p>
        </div>
        <Button leftIcon={<Upload size={18} />} className="shadow-lg shadow-primary-500/20">
          Upload Contract
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-14rem)]">
        {/* Sidebar: Document List */}
        <Card className="lg:col-span-1 h-full overflow-hidden flex flex-col border-none shadow-md">
          <CardHeader className="bg-gray-50 border-b border-gray-100 py-4">
            <h2 className="font-semibold text-gray-800">Files</h2>
          </CardHeader>
          <div className="overflow-y-auto flex-1 p-2 space-y-2 bg-gray-50/50">
            {documents.map(doc => (
              <div 
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-xl cursor-pointer transition-all border ${
                  selectedDoc?.id === doc.id 
                    ? 'bg-white border-primary-200 shadow-md transform scale-[1.02] z-10 relative' 
                    : 'bg-white border-transparent hover:border-gray-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-sm text-gray-900 line-clamp-1 pr-2" title={doc.name}>{doc.name}</h3>
                  {getStatusBadge(doc.status)}
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
                  <span>{doc.date}</span>
                  <span>{doc.size}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Main Area: Preview & Actions */}
        <Card className="lg:col-span-2 h-full flex flex-col border-none shadow-md bg-white overflow-hidden relative">
          {selectedDoc ? (
            <>
              {/* Toolbar */}
              <div className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white/80 backdrop-blur-md z-10">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-800">{selectedDoc.name}</span>
                  {getStatusBadge(selectedDoc.status)}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" leftIcon={<FileDown size={16} />}>
                    Download
                  </Button>
                  <Button variant="outline" size="sm" leftIcon={<Eye size={16} />}>
                    Preview
                  </Button>
                  {selectedDoc.status !== 'Signed' && (
                    <Button 
                      size="sm" 
                      leftIcon={<PenTool size={16} />}
                      onClick={() => setIsSigning(true)}
                    >
                      Sign Document
                    </Button>
                  )}
                </div>
              </div>

              {/* PDF Preview Mock */}
              <div className="flex-1 bg-gray-100 p-8 overflow-y-auto flex justify-center relative">
                <div className="bg-white w-full max-w-3xl min-h-[800px] shadow-2xl rounded-sm p-12 text-gray-800 relative">
                    <div className="text-center mb-10 border-b pb-6">
                        <h1 className="text-2xl font-serif font-bold uppercase tracking-widest text-gray-900 mb-2">Founders Agreement</h1>
                        <p className="text-sm text-gray-500">Effective Date: March 10, 2024</p>
                    </div>
                    
                    <div className="space-y-6 font-serif text-sm leading-relaxed text-gray-700">
                        <p>This Founders Agreement (the "Agreement") is entered into as of the Effective Date by and between the undersigned founders relating to the establishment and operation of a new business entity.</p>
                        
                        <h3 className="font-bold text-gray-900 mt-8 mb-4">1. Business Purpose and Structure</h3>
                        <p>The Founders agree to form a C-Corporation under the laws of Delaware. The specific purpose of the Company is to engage in any lawful act or activity for which corporations may be organized.</p>

                        <h3 className="font-bold text-gray-900 mt-8 mb-4">2. Ownership and Equity</h3>
                        <p>The equity of the Company shall be divided among the Founders in accordance with the capitalization table set forth in Exhibit A attached hereto. All founder shares shall be subject to a four-year vesting schedule with a one-year cliff.</p>

                        <div className="mt-20 pt-10 border-t border-gray-300">
                            <div className="flex justify-between">
                                <div className="w-1/2 pr-8">
                                    <h4 className="font-bold text-gray-900 mb-6">Founder 1</h4>
                                    <div className="h-20 border-b-2 border-gray-300 mb-2 relative">
                                        {selectedDoc.status === 'Signed' && (
                                            <div className="absolute bottom-2 left-4 transform -rotate-6 font-grace text-4xl text-blue-700 opacity-90">
                                                Signed Auth
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500">Signature</p>
                                </div>
                                <div className="w-1/2 pl-8">
                                    <h4 className="font-bold text-gray-900 mb-6">Founder 2</h4>
                                    <div className="h-20 border-b-2 border-gray-300 mb-2"></div>
                                    <p className="text-xs text-gray-500">Signature</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* E-Signature Overlay Modals */}
                {isSigning && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
                    <Card className="w-full max-w-lg shadow-2xl animate-fade-in">
                      <CardHeader className="flex justify-between items-center border-b pt-5 pb-4 px-6">
                        <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                          <PenTool className="text-primary-600" />
                          Apply Signature
                        </h3>
                        <button onClick={() => setIsSigning(false)} className="text-gray-400 hover:text-gray-600">
                          <X size={20} />
                        </button>
                      </CardHeader>
                      <CardBody className="p-6">
                        <p className="text-sm text-gray-600 mb-4">Draw your signature below to sign the document.</p>
                        
                        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl h-48 mb-6 relative group overflow-hidden cursor-crosshair flex items-center justify-center">
                           <span className="text-gray-400 select-none group-hover:opacity-0 transition-opacity">Sign Here</span>
                           {/* Decorative fake signature line */}
                           <div className="absolute bottom-10 left-10 right-10 border-b border-gray-300"></div>
                           <div className="absolute inset-0 hover:bg-black/5 transition-colors"></div>
                        </div>

                        <div className="flex items-center gap-3 bg-blue-50 text-blue-800 p-3 rounded-lg text-sm mb-6">
                          <FileCheck size={16} className="text-blue-500" />
                          <p>By signing, you agree to the Terms of Service and certify this is legally binding.</p>
                        </div>
                        
                        <div className="flex justify-end gap-3">
                          <Button variant="outline" onClick={() => setIsSigning(false)}>Cancel</Button>
                          <Button onClick={handleSign} leftIcon={<Check size={16}/>}>Confirm & Sign</Button>
                        </div>
                      </CardBody>
                    </Card>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <Search size={48} className="mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-500">Select a document to preview</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
