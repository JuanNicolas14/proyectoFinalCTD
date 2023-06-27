package com.example.Backend.service;

import com.example.Backend.dto.ReservaDTO;
import com.example.Backend.models.Reserva;
import com.example.Backend.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@Service
public class ReservaService {
    private final ReservaRepository reservaRepository;

    private final static Logger logger = Logger.getLogger(ReservaService.class.getName());

    @Autowired
    public ReservaService(ReservaRepository reservaRepository) {
        this.reservaRepository = reservaRepository;
    }


    public ReservaDTO guardarReserva(Reserva reserva) {
        Reserva reservaGuardada = reservaRepository.save(reserva);
        return convertirReservaAReservaDTO(reservaGuardada);
    }

    public List<ReservaDTO> findByUserId(Long id) {
        List<Reserva> reservas = reservaRepository.findByUsuarioId(id);
        List<ReservaDTO> reservasDTO = new ArrayList<>();
        for (Reserva reserva : reservas) {
            reservasDTO.add(convertirReservaAReservaDTO(reserva));
        }

        return reservasDTO;
    }

    private ReservaDTO convertirReservaAReservaDTO(Reserva reserva) {
        ReservaDTO reservaDTO = new ReservaDTO();

        reservaDTO.setNombreRestaurante(reserva.getRestaurante().getNombre());
        reservaDTO.setNombrePlan(reserva.getRestaurante().getPlan().getNombre());
        reservaDTO.setFechaInicio(reserva.getFechaInicio());
        reservaDTO.setFechaFinalizacion(reserva.getFechaFinalizacion());
        reservaDTO.setDireccionEntrega(reserva.getDireccionEntrega());
        reservaDTO.setNombreCiudad(reserva.getCiudad().getNombreCiudad());
        reservaDTO.setHoraEntrega(reserva.getHoraEntrega());
        reservaDTO.setPrecio(reserva.getRestaurante().getPrecio());
        reservaDTO.setTelefonoUsuario(reserva.getTelefonoUsuario());

        return reservaDTO;
    }
}
