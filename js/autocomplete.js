app.factory('autocomplete', ['$http', function($http) {
    var baseURL = "http://localhost:9000/";

    var config  = {
        headers             : {'Content-Type': undefined},
        transformRequest    : angular.identity,
    };

    return {
        getKecamatan         : function(){
            return {
                'Cimahi Selatan'    : ['Melong', 'Leuwigajah', 'Cibeber', 'Cibereum'],
                'Cimahi Tengah'     : ['Baros', 'Padasuka', 'Cimahi'],
                'Cimahi Utara'      : ['Cibabat', 'Citeureup'],
            };
        },

        getKelurahan         : function(){
            return [
                {
                    'id'    : '0',
                    'kec'   : 'Cimahi Selatan',
                    'kels'  : [
                        {'kel' : 'Melong'},
                        {'kel' : 'Leuwigajah'},
                        {'kel' : 'Cibeber'},
                        {'kel' : 'Cibereum'}
                    ]
                }, {
                    'id'    : '2',
                    'kec'   : 'Cimahi Tengah',
                    'kels'  : [
                        {'kel' : 'Baros'},
                        {'kel' : 'Padasuka'},
                        {'kel' : 'Cimahi'}
                    ]
                }, {
                    'id'    : '2',
                    'kec'   : 'Cimahi Utara',
                    'kels'  : [
                        {'kel' : 'Cibabat'},
                        {'kel' : 'Citeureup'}
                    ]
                }
            ];
        },

        // getSKPD             : function(){
        //     return {
        //         'Sekretariat Daerah' : ['Sekretariat Daearh','Asisten Perekonomian & Pembangunan Bagian Administrasi Pembangunan',
        //                                 'Asisten Perekonomian & Pembangunan Bagian Administrasi Kesejahteraan Rakyat',
        //                                 'Asisten Perekonomian & Pembangunan Bagian Administrasi Perekonomian',
        //                                 'Asisten Pemerintahan Bagian Pemerintahan',
        //                                 'Asisten Pemerintahan Bagian Hukum',
        //                                 'Asisten Pemerintahan Bagian Organisasi',
        //                                 'Asisten Pemerintahan Bagian Administrasi Umum',
        //                                 'Asisten Pemerintahan Bagian Humas & Protokol',
        //                                 'Asisten Pemerintahan Bagian Keuangan',
        //                                 'Asisten Pemerintahan Bagian Umum',
        //                                 'Asisten Pemerintahan Bagian Perlengkapan'],
        //         'Dinas Daerah'       : ['Dinas Pendidikan, Pemuda, dan Olah Raga', 'Dinas Tenaga Kerja Transmigrasi dan Sosial',
        //                                 'Dinas Koperasi, UMKM, Perindustrian, Perdagangan, dan Pertanian',
        //                                 'Dinas Kebersihan dan Pertanaman', 'Dinas Pendapatan Daerah'],
        //         'Kantor Daerah'      : ['Kantor Arsip, Perpustakaan, dan Pengolahan Data Electronik',
        //                                 'Kantor Kesatuan Bangsa', 'Kantor Pelayan Perizinan Terpadu',
        //                                 'Satuan Polisi Pamong Praja','Kantor Lingkungan Hidup','Inspektorat'],
        //         'Badan Daerah'       : ['Badan Kepegawaian Daerah','Badan Perencanaan Pembangunan Daerah'],
        //         'Lainnya'            : ['Rumah Sakit Umum Daerah Cibabat', 'Sekretariat KOPRI'],
        //     };
        // },


        getSKPD             : function(){
            return  [
                {'id' : 'skpd_1',      'nLengkap' : 'Sekretariat Daerah'},
                {'id' : 'skpd_2',      'nLengkap' : 'Asisten Perekonomian & Pembangunan Bagian Administrasi Pembangunan'},
                {'id' : 'skpd_3',      'nLengkap' : 'Asisten Perekonomian & Pembangunan Bagian Administrasi Kesejahteraan Rakyat'},
                {'id' : 'skpd_4',      'nLengkap' : 'Asisten Perekonomian & Pembangunan Bagian Administrasi Perekonomian'},
                {'id' : 'skpd_5',      'nLengkap' : 'Asisten Pemerintahan Bagian Pemerintahan'},
                {'id' : 'skpd_6',      'nLengkap' : 'Asisten Pemerintahan Bagian Hukum'},
                {'id' : 'skpd_7',      'nLengkap' : 'Asisten Pemerintahan Bagian Organisasi'},
                {'id' : 'skpd_8',      'nLengkap' : 'Asisten Pemerintahan Bagian Administrasi Umum'},
                {'id' : 'skpd_9',      'nLengkap' : 'Asisten Pemerintahan Bagian Humas & Protokol'},
                {'id' : 'skpd_10',     'nLengkap' : 'Asisten Pemerintahan Bagian Keuangan'},
                {'id' : 'skpd_11',     'nLengkap' : 'Asisten Pemerintahan Bagian Umum'},
                {'id' : 'skpd_12',     'nLengkap' : 'Asisten Pemerintahan Bagian Perlengkapan'},
                {'id' : 'skpd_13',     'nLengkap' : 'Dinas Pendidikan, Pemuda, dan Olah Raga'},
                {'id' : 'skpd_14',     'nLengkap' : 'Dinas Tenaga Kerja Transmigrasi dan Sosial'},
                {'id' : 'skpd_15',     'nLengkap' : 'Dinas Koperasi, UMKM, Perindustrian, Perdagangan, dan Pertanian'},
                {'id' : 'skpd_16',     'nLengkap' : 'Dinas Kebersihan dan Pertanaman'},
                {'id' : 'skpd_17',     'nLengkap' : 'Dinas Pendapatan Daerah'},
                {'id' : 'skpd_18',     'nLengkap' : 'Kantor Arsip, Perpustakaan, dan Pengolahan Data Electronik'},
                {'id' : 'skpd_19',     'nLengkap' : 'Kantor Kesatuan Bangsa'},
                {'id' : 'skpd_20',     'nLengkap' : 'Kantor Pelayan Perizinan Terpadu'},
                {'id' : 'skpd_21',     'nLengkap' : 'Satuan Polisi Pamong Praja'},
                {'id' : 'skpd_22',     'nLengkap' : 'Kantor Lingkungan Hidup'},
                {'id' : 'skpd_23',     'nLengkap' : 'Inspektorat'},
                {'id' : 'skpd_24',     'nLengkap' : 'Badan Kepegawaian Daerah'},
                {'id' : 'skpd_25',     'nLengkap' : 'Badan Perencanaan Pembangunan Daerah'},
                {'id' : 'skpd_26',     'nLengkap' : 'Rumah Sakit Umum Daerah Cibabat'},
                {'id' : 'skpd_27',     'nLengkap' : 'Sekretariat KOPRI'},
            ];
        },


        getTag              : function(){
            return [
                'Pembangunan', 'Tata ruang', 'Ketertiban Umum', 'Sarana Umum', 'Perumahan',
                'Kesehatan', 'Pendidikan', 'Sosial', 'Kesejahteraan masyarakat',
                'Koperasi', 'Usaha Kecil dan Menengah', 'Penanaman modal', 'Cipta karya',
                'Lingkungan Hidup', 'Pertanahan',
                'Kependudukan', 'Catatan sipil', 'Pelayanan umum', 'Pelayanan administratif',
                'Perhubungan',
                'Perempuan', 'Anak', 'Ibu Rumah Tangga', 'Keluarga Berencana',
                'Tenaga kerja',
                'Kebudayaan',
                'Pemuda', 'Olah raga',
                'Kesatuan bangsa', 'Otonomi daerah', 'Keuangan daerah', 'Perangkat daerah',
                'Kearsipan', 'Komunikasi', 'Informatika', 'Perpustakaan',
                'Pertanian', 'Pariwisata', 'Kehutanan', 'Pariwisata', 'Kelautan', 'Perikanan',
                'Perdagangan', 'Perindustrian', 'Transimgrasi', 'Bencana',
            ];
        },

        getUnit         : function(){
            return ['m', 'km', 'm2', 'hektar', 'orang', 'KK', 'unit', 'titik'];
        },
    };
}]);
