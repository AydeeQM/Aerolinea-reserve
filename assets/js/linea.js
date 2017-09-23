"use strict";

class Reserve {
    constructor(numSeat, row) {
        this.numSeat = numSeat;
        this.row = row;
        this.passengers = [];
        this.currentCell = undefined;
    }

    drawSeat() {
        let col = this.numSeat / this.row;
        let passage = '';
        let table = '';
        table += `<table class="table table-bordered text-center">`;
        for (let i = 1; i <= this.row; i++) {
            table += `<tr>`;
            let group_seat = i;
            for (let j = 0; j < col; j++) {
                table += `<td>${group_seat}</td>`;
                group_seat += 6;
            }

            (i == 3) ? passage += `<td></td>` : passage = '';
            table += `</tr>${passage}`;
        }

        table += `</table>`;
        $('#tablero').append(table);
    }

    showInput() {
        $('#addpass').click(() => {
            $('#overlay').fadeIn(200, () => {
                $('#passenger').animate({ 'top': '20px' }, 200);
            });
            return false;
        });
        /*$('#send').click(() => {
                    $('#passenger').animate({ 'top': '-300px' }, 500, () => {
                        $('#overlay').fadeOut('fast');
                    });
                }); */
        $('#boxclose').click(() => {
            $('#passenger').animate({ 'top': '-300px' }, 500, () => {
                $('#overlay').fadeOut('fast');
            });
        });
    }

    inboxUser() {
        $('table tr td').click((event) => {
            $("#numseat").val(parseInt(event.target.textContent));
            let num = parseInt($('#numseat').text());//numero del asiento
            this.currentCell = $(event.target);//recupera el TD actual

            //recorre el array this.passengers
            $.grep(this.passengers, (value, index) => {
                if (num == this.passengers[index].Item) {
                    $("#nombre").val(this.passengers[index].Nombre);
                    $("#apell").val(this.passengers[index].Apellido);
                    $("#eldni").val(this.passengers[index].Dni);
                }
            });

        });
    }
    addUser() {
        $('#send').click(() => {
            let data = {};
            let number_seat = $('#numseat').val();
            let suNombre = $('#name').val();
            let suApellido = $('#surname').val();
            let suDNI = parseInt($('#iddni').val());
            data.Item = number_seat;
            data.Nombre = suNombre;
            data.Apellido = suApellido;
            data.Dni = suDNI;

            this.passengers.push(data);
            alert('El pasajero ' + ' ' + data.Nombre + ' ' + data.Apellido + ' en el asiento N° ' + data.Item + ' se ha agregado correctamente');
            this.currentCell.css('background', '#F8ED50');
            $("#nombre").val('');
            $("#apell").val('');
            $("#eldni").val('');

        });
    }
}

let aeroline_reserve = new Reserve(30, 6);
aeroline_reserve.drawSeat();
aeroline_reserve.showInput();
aeroline_reserve.inboxUser();
aeroline_reserve.addUser();