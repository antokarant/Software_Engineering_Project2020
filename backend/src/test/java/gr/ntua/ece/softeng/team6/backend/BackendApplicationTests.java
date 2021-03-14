package gr.ntua.ece.softeng.team6.backend;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class BackendApplicationTests {

	/*@Autowired
	private MockMvc mockMvc;

	@Test
	public void shouldReturnDefaultMessagePoint() throws Exception {
		this.mockMvc.perform(get("/SessionsPerPoint/1/1/20170613/20170613")).andDo(print()).andExpect(status().isOk())
				.andExpect(content().string(containsString("Angela Harris")));
	}
	@Test
	public void shouldReturnDefaultMessageStation() throws Exception {
		this.mockMvc.perform(get("/SessionsPerStation/1/20170613/20190613")).andDo(print()).andExpect(status().isOk())
				.andExpect(content().string(containsString("Angela Harris")));
	}
	@Test
	public void shouldReturnDefaultMessageProvider() throws Exception {
		this.mockMvc.perform(get("/SessionsPerProvider/WATT&VOLT/20180613/20190613")).andDo(print()).andExpect(status().isOk())
				.andExpect(content().string(containsString("WATT&VOLT")));
	}
	@Test
	public void shouldReturnDefaultMessageEV() throws Exception {
		this.mockMvc.perform(get("/SessionsPerEV/LFQ1225/20170613/20200613")).andDo(print()).andExpect(status().isOk())
				.andExpect(content().string(containsString("LFQ1225")));
	}*/
}
