import React, { Component } from "react";
import axios from "axios";
import { Modal } from "antd";
import "antd/dist/antd.css";
export default class tekkom extends Component {
constructor(props) {
super(props);
this.state = {
tekkom: [],
visible: false,
nama: "",
merk: "",
tahun: "",
};
}
handleButton = (nama) => {
alert(nama);
};
handleDelete = (id) => {
    // alert(id)
    var proceed = window.confirm("Srius mau hapus?");
    if (proceed) {
        axios({
            method: "delete",
            url: "https://api12sbkkel9.herokuapp.com/data/del/"+id,
            headers: {
            accept: "*/*"
            }
            })
            .then((data) => {
            alert("berhasil dihapus");
            window.location.reload();
            })
            .catch(() => {
            alert("gagal bos :(");
            });
    } else{
        window.location.reload();
    }
}
handleTambahOrang = () => {
this.setState({
visible: true,
});
};
handleNama = (e) => {
this.setState({
nama: e.target.value,
});
console.log(this.state.nama);
};
handleMerk = (e) => {
this.setState({
merk: e.target.value,
});
console.log(this.state.merk);
};
handleTahun = (e) => {
this.setState({
tahun: e.target.value,
});
console.log(this.state.tahun);
};
handleSubmit = () => {
if (
this.state.nama !== "" &&
this.state.merk !== "" &&
!this.state.tahun !== ""
) {
axios({
method: "post",
url: "https://api12sbkkel9.herokuapp.com/data/post",
headers: {
accept: "*/*",
},
data: {
nama: this.state.nama,
merk: this.state.merk,
tahun: this.state.tahun,
},
})
.then((data) => {
alert("berhasil menambahkan");
window.location.reload();
})
.catch((error) => {
alert("gagal lur");
});
} else {
alert("pastikan semua kolom terisi");
}
};
componentDidMount() {
axios({
method: "get",
url: "https://api12sbkkel9.herokuapp.com/data",
headers: {
accept: "*/*",
},
})
.then((data) => {
// console.log(data.data);
this.setState({
tekkom: data.data,
});
})
.catch((error) => {
console.log(error);
});
}
render() {
return (
<div>
<div className="boxWhite">
<center>
<h1>List Mobil</h1>
</center>
<center>
<button onClick={this.handleTambahOrang}>Tambah Mobil</button>
</center>
<Modal
title="Tambah Mobil Broo!!"
centered
visible={this.state.visible}
onOk={this.handleSubmit}
onCancel={() => this.setState({ visible: false })}
width={500}
>
<div style={{ textAlign: "center" }}>
<p>Nama : </p>{" "}
<input
type="text"
placeholder="nama"
onChange={this.handleNama}
/>
<br />
<p>merk : </p>{" "}
<input type="text" placeholder="merk" onChange={this.handleMerk} />
<br />
<p>tahun : </p>{" "}
<input
type="text"
placeholder="tahun"
onChange={this.handleTahun}
/>
<br />
</div>
</Modal>
{this.state.tekkom.map((results, index) => {
return (
<div className="card" key={results.nama} >
<div className="card-body">
<h5 className="card-title">Nama : {results.nama}</h5>
<h6 className="card-subtitle mb-2 text-muted">
Merk : {results.merk}
</h6>
<p className="card-text">Tahun : {results.tahun}</p>
</div>
<button
className="button"
onClick={() => this.handleButton(results.nama)}
>
klik aku
</button>
<button className="button" onClick={() => this.handleDelete(results._id)}>
Hapus data   
</button>
</div>
);
})}
</div>
</div>
);
}
}